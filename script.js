const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');

fileInput.addEventListener('change', function () {
  const file = this.files[0];

  if (file && file.name.endsWith('.md')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const markdown = e.target.result;
      const html = marked.parse(markdown);
      preview.innerHTML = html;

      // Enable download button
      downloadBtn.disabled = false;

      // Store for download
      downloadBtn.onclick = function () {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace('.md', '.html');
        a.click();
        URL.revokeObjectURL(url);
      };
    };

    reader.readAsText(file);
  } else {
    alert('Please upload a valid .md file.');
  }
});
