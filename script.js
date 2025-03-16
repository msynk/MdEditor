function formatMarkdown(before, after) {
    const editor = document.getElementById('markdown-editor');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    // Extract the selected text
    const selectedText = editor.value.substring(start, end);

    // Wrap the selected text with the formatting markers
    const formattedText = before + selectedText + after;

    // Replace the selected text with the formatted text
    editor.value =
        editor.value.substring(0, start) +
        formattedText +
        editor.value.substring(end);

    // Maintain cursor position
    editor.focus();
    editor.setSelectionRange(start + before.length, end + before.length);

    // Update the preview after formatting
    updatePreview();
}

function updatePreview() {
    const editor = document.getElementById('markdown-editor');
    const preview = document.getElementById('preview');

    // Simple Markdown parser for demonstration purposes
    let content = editor.value;

    // Basic Markdown replacements for live preview
    content = content
        .replace(/^### (.+)$/gm, '<h3>$1</h3>') // Headers (###)
        .replace(/^## (.+)$/gm, '<h2>$1</h2>') // Headers (##)
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')  // Headers (#)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold (**)
        .replace(/_(.+?)_/g, '<em>$1</em>') // Italic (_)
        .replace(/`(.+?)`/g, '<code>$1</code>') // Inline code (`)
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>') // Links [text](url)
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>') // Blockquote (>)
        .replace(/^-\s(.+)$/gm, '<li>$1</li>') // List items (- )
        .replace(/^\s*-\s(.+)/gm, '<ul><li>$1</li></ul>'); // Wrap lists in <ul>

    // Handle multiple consecutive lists
    content = content.replace(/<\/ul>\s*<ul>/g, '');

    // Set the parsed content in the preview area
    preview.innerHTML = content;
}
