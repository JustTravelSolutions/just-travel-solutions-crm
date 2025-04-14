// Reward Tracking System for Just Travel Solutions CRM
// This script handles VIP status calculations and reward points tracking

// VIP Status Thresholds
const VIP_THRESHOLDS = {
    standard: 0,
    silver: 5000,
    gold: 10000,
    platinum: 15000
};

// Points conversion rate (1 point per $10 spent)
const POINTS_CONVERSION_RATE = 10;

// Initialize reward tracking system
function initRewardTracking() {
    console.log("Initializing reward tracking system...");
    
    // Update VIP status badges based on spend
    updateVIPStatusBadges();
    
    // Add event listeners for spend changes
    document.addEventListener('DOMContentLoaded', function() {
        // Listen for changes to client spend inputs
        const spendInputs = document.querySelectorAll('#totalSpend, .spend-input');
        spendInputs.forEach(input => {
            input.addEventListener('change', function(e) {
                const spend = parseFloat(e.target.value) || 0;
                const points = calculateRewardPoints(spend);
                const status = calculateVIPStatus(spend);
                
                // Update related fields if they exist
                const form = e.target.closest('form');
                if (form) {
                    const pointsField = form.querySelector('#rewardPoints, .points-input');
                    const statusField = form.querySelector('#vipStatus, .status-input');
                    
                    if (pointsField) pointsField.value = points;
                    if (statusField) statusField.value = status;
                }
            });
        });
        
        // Add client form submission handler
        const clientForms = document.querySelectorAll('#clientForm, #addClientForm, #editClientForm');
        clientForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                // Ensure passport and birthdate fields are included in submission
                const passportFields = form.querySelectorAll('.passport-field');
                const birthdateField = form.querySelector('#clientBirthdate, #birthdate, .birthdate-picker');
                
                // Log the data being submitted
                console.log("Submitting client data with passport and birthdate information");
                console.log("Birthdate:", birthdateField ? birthdateField.value : "Not provided");
                
                // Calculate reward points and VIP status before submission
                const spendField = form.querySelector('#totalSpend, .spend-input');
                if (spendField) {
                    const spend = parseFloat(spendField.value) || 0;
                    const points = calculateRewardPoints(spend);
                    const status = calculateVIPStatus(spend);
                    
                    console.log("Client spend:", spend);
                    console.log("Reward points:", points);
                    console.log("VIP status:", status);
                }
            });
        });
    });
    
    // Initialize datepickers for birthdate fields
    initDatepickers();
}

// Calculate reward points based on spend
function calculateRewardPoints(spend) {
    return Math.floor(spend / POINTS_CONVERSION_RATE);
}

// Calculate VIP status based on spend
function calculateVIPStatus(spend) {
    if (spend >= VIP_THRESHOLDS.platinum) return 'platinum';
    if (spend >= VIP_THRESHOLDS.gold) return 'gold';
    if (spend >= VIP_THRESHOLDS.silver) return 'silver';
    return 'standard';
}

// Update VIP status badges in client list
function updateVIPStatusBadges() {
    const clientRows = document.querySelectorAll('tr[data-client-id]');
    
    clientRows.forEach(row => {
        const spendCell = row.querySelector('.client-spend');
        const pointsCell = row.querySelector('.client-points');
        const statusBadge = row.querySelector('.vip-status-badge');
        
        if (spendCell && statusBadge) {
            const spend = parseFloat(spendCell.textContent.replace(/[^0-9.-]+/g, '')) || 0;
            const status = calculateVIPStatus(spend);
            
            // Update badge class and text
            statusBadge.className = 'badge vip-status-badge';
            
            switch (status) {
                case 'platinum':
                    statusBadge.classList.add('bg-primary');
                    statusBadge.textContent = 'Platinum';
                    break;
                case 'gold':
                    statusBadge.classList.add('bg-warning');
                    statusBadge.textContent = 'Gold';
                    break;
                case 'silver':
                    statusBadge.classList.add('bg-secondary');
                    statusBadge.textContent = 'Silver';
                    break;
                default:
                    statusBadge.classList.add('bg-info');
                    statusBadge.textContent = 'Standard';
            }
            
            // Update points if needed
            if (pointsCell) {
                const points = calculateRewardPoints(spend);
                pointsCell.textContent = points;
                row.setAttribute('data-reward-points', points);
            }
        }
    });
}

// Initialize datepickers for birthdate and passport date fields
function initDatepickers() {
    // This function would normally use a datepicker library
    // For this demo, we're ensuring the date fields are properly set up
    const dateFields = document.querySelectorAll('.birthdate-picker, #clientBirthdate, #birthdate, #passportIssueDate, #passportExpiryDate');
    
    dateFields.forEach(field => {
        // Ensure the field is a date input
        field.type = 'date';
        
        // Add a data attribute to mark it as initialized
        field.setAttribute('data-initialized', 'true');
        
        console.log(`Initialized date field: ${field.id || field.name || 'unnamed field'}`);
    });
}

// Ensure passport fields are properly displayed in client profile
function ensurePassportFieldsDisplay() {
    const viewClientModal = document.getElementById('viewClientModal');
    if (viewClientModal) {
        const infoTab = viewClientModal.querySelector('#info');
        if (infoTab) {
            // Check if passport section exists
            const passportSection = infoTab.querySelector('.col-md-6 h6:contains("Passport Information")');
            if (!passportSection) {
                // Create passport section if it doesn't exist
                const contactSection = infoTab.querySelector('.col-md-6');
                if (contactSection) {
                    const passportDiv = document.createElement('div');
                    passportDiv.className = 'col-md-6';
                    passportDiv.innerHTML = `
                        <h6>Passport Information</h6>
                        <p><strong>Passport #:</strong> <span class="passport-number">-</span></p>
                        <p><strong>Country:</strong> <span class="passport-country">-</span></p>
                        <p><strong>Issue Date:</strong> <span class="passport-issue-date">-</span></p>
                        <p><strong>Expiry Date:</strong> <span class="passport-expiry-date">-</span></p>
                    `;
                    contactSection.parentNode.appendChild(passportDiv);
                }
            }
        }
    }
}

// Export functions for use in main.js
window.rewardTracking = {
    init: initRewardTracking,
    calculatePoints: calculateRewardPoints,
    calculateStatus: calculateVIPStatus,
    updateBadges: updateVIPStatusBadges,
    ensurePassportFields: ensurePassportFieldsDisplay
};

// Initialize when the script loads
initRewardTracking();
