const ctx = document.getElementById('myChart');

// Fetch data from the local JSON file
fetch('graph.json')
  .then(response => response.json())
  .then(data => {
    // Use the fetched data to update the chart
    updateChart(ctx, data);
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to update the chart with new data
function updateChart(ctx, newData) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: newData.labels,
      datasets: [{
        label: 'Detail 1',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        data: newData.detail1Data
      }, {
        label: 'Detail 2',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: newData.detail2Data
      }]
    },
    options: {
      scales: {
        x: {
          stacked: false
        },
        y: {
          stacked: false,
          beginAtZero: true
        }
      }
    }
  });
}