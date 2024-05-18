document.addEventListener('DOMContentLoaded', function() {
    const createTenantForm = document.getElementById('createTenantForm');
    const tenantsList = document.getElementById('tenantsList');
  
    createTenantForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const tenantNameInput = document.getElementById('tenantName');
      const tenantName = tenantNameInput.value;
  
      fetch('/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: tenantName })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        tenantNameInput.value = '';
        fetchTenants();
      })
      .catch(error => console.error('Error creating tenant:', error));
    });
  
    function fetchTenants() {
      fetch('/tenants')
      .then(response => response.json())
      .then(data => {
        renderTenants(data.tenants);
      })
      .catch(error => console.error('Error fetching tenants:', error));
    }
  
    function renderTenants(tenants) {
      tenantsList.innerHTML = '';
      tenants.forEach(tenant => {
        const tenantItem = document.createElement('div');
        tenantItem.textContent = tenant.name;
        tenantsList.appendChild(tenantItem);
      });
    }
  
    fetchTenants();
  });
  