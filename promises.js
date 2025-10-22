const API_URL = 'https://motivational-spark-api.vercel.app/api/quotes/random/10';

// creates a Promise that fetches the quotes and parses JSON
const fetchQuotes = new Promise((resolve, reject) => {
	fetch(API_URL)
		.then(response => {
			if (!response.ok) {
				reject(new Error('Network response was not ok'));
				return;
			}
			return response.json();
		})
		.then(data => resolve(data))
		.catch(err => reject(err));
});

// render quotes into the #demo container
function renderQuotes(quotes) {
	const container = document.getElementById('demo');
	if (!container) return;

	const list = document.createElement('ul');
	list.className = 'quotes-list';

	quotes.forEach(q => {
		const li = document.createElement('li');
		li.className = 'quote-item';
		li.innerHTML = `
			<blockquote>"${escapeHtml(q.quote)}"</blockquote>
			<cite>- ${escapeHtml(q.author || 'Unknown')}</cite>
		`;
		list.appendChild(li);
	});

	container.appendChild(list);
}

// escape HTML to avoid accidental injection
function escapeHtml(str) {
	if (typeof str !== 'string') return '';
	return str.replace(/[&<>"']/g, function (c) {
		return {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;'
		}[c];
	});
}

// handle success / failure
fetchQuotes
	.then(data => {
		// data should be an array of quotes
		renderQuotes(data);
	})
	.catch(error => {
		const err = new Error('Failed to fetch data');
		console.log(err);

		const container = document.getElementById('demo');
		if (container) {
			container.innerHTML = `<p class="error">${escapeHtml(err.message)}</p>`;
		}
	});

