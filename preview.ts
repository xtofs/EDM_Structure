import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { Converter } from 'showdown';

// Configure showdown converter with GitHub Flavored Markdown features
const converter = new Converter({
    tables: true,
    strikethrough: true,
    tasklists: true,
    emoji: true,
    underline: true,
    openLinksInNewWindow: true,
    headerLevelStart: 1,
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    excludeTrailingPunctuationFromURLs: true,
    literalMidWordUnderscores: true,
    simpleLineBreaks: false,
    requireSpaceBeforeHeadingText: true,
    ghCompatibleHeaderId: true,
    prefixHeaderId: false,
    rawHeaderId: false,
    smoothLivePreview: true,
    splitAdjacentBlockquotes: true
});

const GENERATED_DIR = 'generated';
const PREVIEW_DIR = 'preview';

// HTML template
const htmlTemplate = (title: string, content: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
        }
        
        h1 {
            font-size: 2em;
            border-bottom: 2px solid #eaecef;
        }
        
        h2 {
            font-size: 1.5em;
        }
        
        h3 {
            font-size: 1.25em;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
            font-size: 0.9em;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
        }
        
        th {
            background-color: #f2f2f2;
            font-weight: 600;
            color: #2c3e50;
        }
        
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        tr:hover {
            background-color: #f5f5f5;
        }
        
        a {
            color: #0366d6;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        code {
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
            font-size: 0.85em;
        }
        
        pre {
            background-color: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
            border: 1px solid #e1e4e8;
        }
        
        pre code {
            background-color: transparent;
            padding: 0;
        }
        
        blockquote {
            border-left: 4px solid #dfe2e5;
            padding-left: 16px;
            color: #6a737d;
            margin-left: 0;
        }
        
        .toc {
            background-color: #f8f9fa;
            border: 1px solid #e1e4e8;
            border-radius: 6px;
            padding: 16px;
            margin: 20px 0;
        }
        
        .toc h2 {
            margin-top: 0;
            font-size: 1.2em;
            border-bottom: 1px solid #e1e4e8;
            padding-bottom: 8px;
        }
        
        .toc ul {
            margin: 0;
            padding-left: 20px;
        }
        
        .stats {
            background-color: #e7f3ff;
            border: 1px solid #b3d9ff;
            border-radius: 6px;
            padding: 16px;
            margin: 20px 0;
        }
        
        .timestamp {
            font-size: 0.8em;
            color: #6a737d;
            text-align: right;
            margin-top: 40px;
            border-top: 1px solid #e1e4e8;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    ${content}
    
    <div class="timestamp">
        Generated on ${new Date().toLocaleString()}
    </div>
</body>
</html>`;

function convertMarkdownToHtml() {
    console.log('🔄 Converting markdown files to HTML...');
    
    // Create preview directory if it doesn't exist
    if (!fs.existsSync(PREVIEW_DIR)) {
        fs.mkdirSync(PREVIEW_DIR);
    }
    
    // Get all markdown files from generated directory
    const markdownFiles = fs.readdirSync(GENERATED_DIR)
        .filter(file => file.endsWith('.md'))
        .sort();
    
    if (markdownFiles.length === 0) {
        console.log('❌ No markdown files found in generated directory. Run "npm run generate" first.');
        process.exit(1);
    }
    
    let convertedCount = 0;
    
    // Convert each markdown file
    markdownFiles.forEach(file => {
        const markdownPath = path.join(GENERATED_DIR, file);
        const htmlFileName = file.replace('.md', '.html');
        const htmlPath = path.join(PREVIEW_DIR, htmlFileName);
        
        try {
            // Read markdown content
            const markdownContent = fs.readFileSync(markdownPath, 'utf8');
            
            // Convert to HTML
            const htmlBody = converter.makeHtml(markdownContent);
            
            // Generate title from filename
            const title = file.replace('.md', '')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
            
            // Create full HTML with template
            const fullHtml = htmlTemplate(title, htmlBody);
            
            // Write HTML file
            fs.writeFileSync(htmlPath, fullHtml);
            
            console.log(`✅ Converted: ${file} → ${htmlFileName}`);
            convertedCount++;
        } catch (error) {
            console.error(`❌ Error converting ${file}:`, error);
        }
    });
    
    // Create index page if main documentation exists
    const mainDocFile = markdownFiles.find(f => f.includes('edm_structure') || f === 'index.md');
    if (mainDocFile && !fs.existsSync(path.join(PREVIEW_DIR, 'index.html'))) {
        const srcPath = path.join(PREVIEW_DIR, mainDocFile.replace('.md', '.html'));
        const indexPath = path.join(PREVIEW_DIR, 'index.html');
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, indexPath);
            console.log(`✅ Created index.html from ${mainDocFile}`);
        }
    }
    
    console.log(`\n🎉 Successfully converted ${convertedCount} markdown files to HTML`);
    console.log(`📁 HTML files saved in: ${path.resolve(PREVIEW_DIR)}`);
    
    // Open the index.html file in the default browser
    const indexPath = path.resolve(PREVIEW_DIR, 'index.html');
    console.log(`🌐 Opening ${indexPath} in your browser...`);
    
    // Cross-platform browser opening with proper detaching
    let command: string;
    let args: string[];
    
    if (process.platform === 'win32') {
        // Use 'cmd /c start' to properly open in default browser on Windows
        command = 'cmd';
        args = ['/c', 'start', '""', indexPath];
    } else if (process.platform === 'darwin') {
        command = 'open';
        args = [indexPath];
    } else {
        command = 'xdg-open';
        args = [indexPath];
    }
    
    // Spawn the process detached so it doesn't block
    const child = spawn(command, args, {
        detached: true,
        stdio: 'ignore'
    });
    
    // Unref the child process so the parent can exit
    child.unref();
    
    console.log(`✅ Preview opened in browser`);
}

// Run the conversion
convertMarkdownToHtml();
