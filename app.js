    function fetchCryptocurrencyData() {
        const timestamp = new Date().getTime(); 
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&_=${timestamp}`;
        return fetch(apiUrl)
          .then(response => response.json())
          .catch(error => console.error('Error fetching data:', error));
      }
  
  
      function createGridViewCard(crypto) {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const image = document.createElement('img');
        image.src = crypto.image;
        image.alt = crypto.name;
        card.appendChild(image);
  
        const name = document.createElement('h3');
        name.textContent = crypto.name;
        card.appendChild(name);
  
        const currentPrice = document.createElement('p');
        currentPrice.textContent = '$' + crypto.current_price.toLocaleString();
        card.appendChild(currentPrice);
  
        const marketCap = document.createElement('p');
        marketCap.textContent = 'Market Cap: $' + crypto.market_cap.toLocaleString();
        card.appendChild(marketCap);
  
        const priceChange = document.createElement('p');
        priceChange.textContent = '24h Change: ' + crypto.price_change_percentage_24h + '%';
        card.appendChild(priceChange);
  
        const gridView = document.getElementById('gridView');
        gridView.appendChild(card);
      }
  
      function createListViewRow(crypto) {
        const row = document.createElement('tr');
        
        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = crypto.image;
        image.alt = crypto.name;
        imageCell.appendChild(image);
        row.appendChild(imageCell);
  
        const nameCell = document.createElement('td');
        nameCell.textContent = crypto.name;
        row.appendChild(nameCell);
  
        const currentPriceCell = document.createElement('td');
        currentPriceCell.textContent = '$' + crypto.current_price.toLocaleString();
        row.appendChild(currentPriceCell);
  
        const marketCapCell = document.createElement('td');
        marketCapCell.textContent = '$' + crypto.market_cap.toLocaleString();
        row.appendChild(marketCapCell);
  
        const priceChangeCell = document.createElement('td');
        priceChangeCell.textContent = crypto.price_change_percentage_24h + '%';
        row.appendChild(priceChangeCell);
  
        const listViewTableBody = document.getElementById('listViewTableBody');
        listViewTableBody.appendChild(row);
      }
  
      function switchView(view) {
        const gridView = document.getElementById('gridView');
        const listView = document.getElementById('listView');
        if (view === 'grid') {
          gridView.style.display = 'grid';
          listView.style.display = 'none';
          document.getElementById('gridViewBtn').classList.add('active');
          document.getElementById('listViewBtn').classList.remove('active');
        } else if (view === 'list') {
          gridView.style.display = 'none';
          listView.style.display = 'block';
          document.getElementById('gridViewBtn').classList.remove('active');
          document.getElementById('listViewBtn').classList.add('active');
        }
      }
  
      fetchCryptocurrencyData()
        .then(data => {
          data.forEach(crypto => {
            createGridViewCard(crypto);
            createListViewRow(crypto);
          });
        })
        .catch(error => console.error('Error:', error));
  
      document.getElementById('gridViewBtn').addEventListener('click', () => switchView('grid'));
      document.getElementById('listViewBtn').addEventListener('click', () => switchView('list'));
    