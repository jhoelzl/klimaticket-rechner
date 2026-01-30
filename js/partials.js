async function loadPartial(targetId, url) {
    const target = document.getElementById(targetId);
    if (!target) return;

    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`Failed to load ${url}: ${res.status}`);
        }
        const html = await res.text();
        target.innerHTML = html;
    } catch (err) {
        console.error('Partial load failed:', err);
        target.innerHTML = '<p style="color: #d32f2f; padding: 16px;">Failed to load app layout.</p>';
    }
}

async function bootApp() {
    await loadPartial('app', 'partials/app.html');
    if (typeof initApp === 'function') {
        initApp();
    }
}

bootApp();
