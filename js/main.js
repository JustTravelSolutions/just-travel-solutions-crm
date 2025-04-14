// Just Travel Solutions CRM - Main JavaScript
// This file contains all the interactive functionality for the CRM

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Initialize Bootstrap components
    initializeBootstrapComponents();
    
    // Initialize all interactive buttons
    initializeInteractiveButtons();
    
    // Initialize modal dialogs
    initializeModalDialogs();
    
    // Initialize toast notifications
    initializeToastNotifications();
    
    // Initialize dashboard charts if on dashboard page
    if (window.location.href.includes('dashboard.html')) {
        initializeDashboardCharts();
    }
    
    // Initialize client custom fields if on clients page
    if (window.location.href.includes('clients.html')) {
        initializeClientCustomFields();
    }
    
    // Initialize reward tracking if enabled
    initializeRewardTracking();
    
    console.log('Just Travel Solutions CRM initialized successfully');
});

// Initialize Bootstrap components
function initializeBootstrapComponents() {
    console.log('Initializing Bootstrap components');
    
    // Initialize tooltips
    try {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    } catch (e) {
        console.error('Error initializing tooltips:', e);
    }
    
    // Initialize popovers
    try {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    } catch (e) {
        console.error('Error initializing popovers:', e);
    }
}

// Initialize all interactive buttons
function initializeInteractiveButtons() {
    console.log('Initializing all interactive buttons');
    
    // Direct initialization of modals for buttons with data-bs-toggle="modal"
    // This ensures Bootstrap's built-in modal functionality works
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
        console.log('Found modal toggle button:', button.getAttribute('data-bs-target'));
    });
    
    // Commission Tracking buttons
    initializeCommissionButtons();
    
    // Task Management buttons
    initializeTaskButtons();
    
    // Client Management buttons
    initializeClientButtons();
    
    // Booking Management buttons
    initializeBookingButtons();
    
    // Itinerary Builder buttons
    initializeItineraryButtons();
    
    // Pipeline Management buttons
    initializePipelineButtons();
    
    // Time Tracker buttons
    initializeTimeTrackerButtons();
    
    // Import/Export buttons
    initializeImportExportButtons();
    
    // See It In Action button on homepage
    initializeSeeItInActionButton();
    
    // Add direct click handlers for dropdown menu items that add things
    initializeDropdownActionButtons();
}

// Initialize dropdown action buttons (for items in dropdown menus)
function initializeDropdownActionButtons() {
    console.log('Initializing dropdown action buttons');
    
    // Find all dropdown items with "Add Booking" text
    document.querySelectorAll('.dropdown-item:contains("Add Booking")').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Booking dropdown item clicked');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addBookingModal');
            if (!modal) {
                createDynamicModal('addBookingModal', 'Add New Booking', createBookingForm());
                modal = document.getElementById('addBookingModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Add similar handlers for other common dropdown actions
    const actionMap = {
        'Add Commission': 'addCommissionModal',
        'Add Task': 'addTaskModal',
        'Add Time Entry': 'addTimeEntryModal',
        'Add Itinerary': 'addItineraryModal'
    };
    
    // Process each action type
    Object.entries(actionMap).forEach(([actionText, modalId]) => {
        document.querySelectorAll(`.dropdown-item:contains("${actionText}")`).forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`${actionText} dropdown item clicked`);
                
                // Try to find the modal or create it
                let modal = document.getElementById(modalId);
                if (!modal) {
                    createDynamicModal(modalId, actionText, createGenericForm(actionText));
                    modal = document.getElementById(modalId);
                }
                
                // Show the modal using Bootstrap
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            });
        });
    });
}

// Create a dynamic modal if it doesn't exist
function createDynamicModal(modalId, title, formContent) {
    if (document.getElementById(modalId)) {
        return; // Modal already exists
    }
    
    const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}Label">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${formContent}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary modal-submit-btn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create a container for the modal if it doesn't exist
    let modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modalContainer';
        document.body.appendChild(modalContainer);
    }
    
    // Add the modal to the container
    modalContainer.insertAdjacentHTML('beforeend', modalHTML);
}

// Create a generic form for dynamic modals
function createGenericForm(actionType) {
    switch(actionType) {
        case 'Add Commission':
            return createCommissionForm();
        case 'Add Task':
            return createTaskForm();
        case 'Add Time Entry':
            return createTimeEntryForm();
        case 'Add Itinerary':
            return createItineraryForm();
        default:
            return `
                <form id="genericForm">
                    <div class="alert alert-info">
                        This is a demo form for ${actionType}. In a production environment, this would contain relevant fields.
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                    </div>
                </form>
            `;
    }
}

// Initialize Commission Tracking buttons
function initializeCommissionButtons() {
    console.log('Initializing Commission Tracking buttons');
    
    // Direct handler for Add Commission button
    document.querySelectorAll('.add-commission-btn, button[data-action="add-commission"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Commission button clicked directly');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addCommissionModal');
            if (!modal) {
                createDynamicModal('addCommissionModal', 'Add New Commission', createCommissionForm());
                modal = document.getElementById('addCommissionModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Commission filter buttons
    document.querySelectorAll('.commission-filter-btn, button[data-filter]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            filterCommissions(this.dataset.filter || 'all');
            console.log('Commission filter button clicked:', this.dataset.filter || 'all');
        });
    });
    
    // Commission status toggle buttons
    document.querySelectorAll('.commission-status-btn, .status-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            updateCommissionStatus(this.dataset.commissionId || '1', this.dataset.status || 'pending');
            showToast('Commission status updated successfully');
            console.log('Commission status updated:', this.dataset.commissionId || '1', this.dataset.status || 'pending');
        });
    });
}

// Initialize Task Management buttons
function initializeTaskButtons() {
    console.log('Initializing Task Management buttons');
    
    // Direct handler for Add Task button
    document.querySelectorAll('.add-task-btn, button[data-action="add-task"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Task button clicked directly');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addTaskModal');
            if (!modal) {
                createDynamicModal('addTaskModal', 'Add New Task', createTaskForm());
                modal = document.getElementById('addTaskModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Task checkbox toggles
    document.querySelectorAll('.task-checkbox, input[type="checkbox"][class*="task"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskId = this.dataset.taskId || this.id || '1';
            updateTaskStatus(taskId, this.checked);
            showToast(this.checked ? 'Task marked as complete' : 'Task marked as incomplete');
            console.log('Task status updated:', taskId, this.checked);
        });
    });
    
    // Task filter buttons
    document.querySelectorAll('.task-filter-btn, button[data-filter]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            filterTasks(this.dataset.filter || 'all');
            console.log('Task filter button clicked:', this.dataset.filter || 'all');
        });
    });
}

// Initialize Client Management buttons
function initializeClientButtons() {
    console.log('Initializing Client Management buttons');
    
    // Direct handler for Add Client button
    document.querySelectorAll('.add-client-btn, button[data-action="add-client"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Client button clicked directly');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addClientModal');
            if (!modal) {
                createDynamicModal('addClientModal', 'Add New Client', createClientForm());
                modal = document.getElementById('addClientModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Client filter buttons
    document.querySelectorAll('.client-filter-btn, select[id*="Filter"]').forEach(btn => {
        btn.addEventListener('change', function() {
            filterClients(this.value || 'all');
            console.log('Client filter changed:', this.value || 'all');
        });
    });
    
    // Apply filters button
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            applyClientFilters();
            console.log('Apply filters button clicked');
        });
    }
    
    // Reset filters button
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetClientFilters();
            console.log('Reset filters button clicked');
        });
    }
    
    // Client custom fields
    initializeClientCustomFields();
}

// Initialize Client Custom Fields
function initializeClientCustomFields() {
    console.log('Initializing Client Custom Fields');
    
    // Birthdate picker
    document.querySelectorAll('.birthdate-picker, input[class*="birthdate"], input[name="birthdate"]').forEach(picker => {
        picker.addEventListener('change', function() {
            const clientId = this.dataset.clientId || '1';
            updateClientBirthdate(clientId, this.value);
            console.log('Client birthdate updated:', clientId, this.value);
        });
    });
    
    // Passport details fields
    document.querySelectorAll('.passport-field, input[class*="passport"], input[name*="passport"]').forEach(field => {
        field.addEventListener('change', function() {
            const clientId = this.dataset.clientId || '1';
            const fieldType = this.dataset.field || this.name.replace('passport', '').toLowerCase() || 'number';
            updateClientPassport(clientId, fieldType, this.value);
            console.log('Client passport updated:', clientId, fieldType, this.value);
        });
    });
    
    // Relationship connection fields
    document.querySelectorAll('.relationship-field, select[class*="relationship"], select[name="relationship"]').forEach(field => {
        field.addEventListener('change', function() {
            const clientId = this.dataset.clientId || '1';
            const relatedId = document.getElementById('relatedTraveler')?.value || '2';
            updateClientRelationship(clientId, relatedId, this.value);
            console.log('Client relationship updated:', clientId, relatedId, this.value);
            
            // Show/hide related traveler dropdown
            const relatedTravelerContainer = document.querySelector('.related-traveler-container');
            if (relatedTravelerContainer) {
                if (this.value) {
                    relatedTravelerContainer.classList.remove('d-none');
                } else {
                    relatedTravelerContainer.classList.add('d-none');
                }
            }
        });
    });
    
    // Reward tracking fields
    document.querySelectorAll('.reward-field, input[class*="reward"], input[name*="reward"]').forEach(field => {
        field.addEventListener('change', function() {
            const clientId = this.dataset.clientId || '1';
            updateClientRewards(clientId, this.value);
            console.log('Client rewards updated:', clientId, this.value);
        });
    });
}

// Initialize Booking Management buttons
function initializeBookingButtons() {
    console.log('Initializing Booking Management buttons');
    
    // Direct handler for Add Booking button
    document.querySelectorAll('.add-booking-btn, button[data-action="add-booking"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Booking button clicked directly');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addBookingModal');
            if (!modal) {
                createDynamicModal('addBookingModal', 'Add New Booking', createBookingForm());
                modal = document.getElementById('addBookingModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Special handling for "Add Booking" links in dropdown menus
    document.querySelectorAll('a.dropdown-item:contains("Add Booking")').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Booking link clicked from dropdown');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addBookingModal');
            if (!modal) {
                createDynamicModal('addBookingModal', 'Add New Booking', createBookingForm());
                modal = document.getElementById('addBookingModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Booking filter buttons
    document.querySelectorAll('.booking-filter-btn, .filter-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            filterBookings(this.dataset.filter || 'all');
            console.log('Booking filter button clicked:', this.dataset.filter || 'all');
        });
    });
    
    // Booking status buttons
    document.querySelectorAll('.booking-status-btn, .status-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const bookingId = this.dataset.bookingId || '1';
            const status = this.dataset.status || 'confirmed';
            updateBookingStatus(bookingId, status);
            showToast('Booking status updated successfully');
            console.log('Booking status updated:', bookingId, status);
        });
    });
}

// Initialize Itinerary Builder buttons
function initializeItineraryButtons() {
    console.log('Initializing Itinerary Builder buttons');
    
    // Direct handler for Add Itinerary button
    document.querySelectorAll('.add-itinerary-btn, button[data-action="add-itinerary"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Itinerary button clicked directly');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addItineraryModal');
            if (!modal) {
                createDynamicModal('addItineraryModal', 'Create New Itinerary', createItineraryForm());
                modal = document.getElementById('addItineraryModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Add Day button
    document.querySelectorAll('.add-day-btn, button[data-action="add-day"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            addItineraryDay();
            showToast('New day added to itinerary');
            console.log('Add Day button clicked');
        });
    });
    
    // Add Activity button
    document.querySelectorAll('.add-activity-btn, button[data-action="add-activity"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Activity button clicked');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addActivityModal');
            if (!modal) {
                createDynamicModal('addActivityModal', 'Add New Activity', createActivityForm());
                modal = document.getElementById('addActivityModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
}

// Initialize Pipeline Management buttons
function initializePipelineButtons() {
    console.log('Initializing Pipeline Management buttons');
    
    // Add Opportunity button
    document.querySelectorAll('.add-opportunity-btn, button[data-action="add-opportunity"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Opportunity button clicked');
            
            // Try to find the modal or create it
            let modal = document.getElementById('newOpportunityModal');
            if (!modal) {
                createDynamicModal('newOpportunityModal', 'Add New Opportunity', createOpportunityForm());
                modal = document.getElementById('newOpportunityModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Stage movement buttons
    document.querySelectorAll('.move-stage-btn, button[data-action="move-stage"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const opportunityId = this.dataset.opportunityId || '1';
            const direction = this.dataset.direction || 'forward';
            moveOpportunityStage(opportunityId, direction);
            showToast('Opportunity moved to new stage');
            console.log('Opportunity stage moved:', opportunityId, direction);
        });
    });
}

// Initialize Time Tracker buttons
function initializeTimeTrackerButtons() {
    console.log('Initializing Time Tracker buttons');
    
    // Start Timer button
    document.querySelectorAll('.start-timer-btn, button[data-action="start-timer"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            startTimer();
            showToast('Timer started');
            console.log('Start Timer button clicked');
        });
    });
    
    // Stop Timer button
    document.querySelectorAll('.stop-timer-btn, button[data-action="stop-timer"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            stopTimer();
            showToast('Timer stopped');
            console.log('Stop Timer button clicked');
        });
    });
    
    // Add Time Entry button
    document.querySelectorAll('.add-time-entry-btn, button[data-action="add-time-entry"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Time Entry button clicked');
            
            // Try to find the modal or create it
            let modal = document.getElementById('addTimeEntryModal');
            if (!modal) {
                createDynamicModal('addTimeEntryModal', 'Add Time Entry', createTimeEntryForm());
                modal = document.getElementById('addTimeEntryModal');
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
}

// Initialize Import/Export buttons
function initializeImportExportButtons() {
    console.log('Initializing Import/Export buttons');
    
    // Import buttons
    document.querySelectorAll('button[class*="import"]:not([class*="supplier"]), button[data-action="import"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const dataType = this.dataset.type || 'generic';
            console.log('Import button clicked:', dataType);
            
            // Try to find the modal or create it
            let modalId = `import${dataType.charAt(0).toUpperCase() + dataType.slice(1)}Modal`;
            let modal = document.getElementById(modalId);
            if (!modal) {
                createDynamicModal(modalId, `Import ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`, createImportForm(dataType));
                modal = document.getElementById(modalId);
            }
            
            // Show the modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
    
    // Export buttons
    document.querySelectorAll('button[class*="export"], button[data-action="export"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const dataType = this.dataset.type || 'generic';
            exportData(dataType);
            showToast(`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} export started. Your file will be ready shortly.`);
            console.log('Export button clicked:', dataType);
        });
    });
}

// Initialize See It In Action button on homepage
function initializeSeeItInActionButton() {
    console.log('Initializing See It In Action button');
    
    document.querySelectorAll('.btn-action, a:contains("See It In Action"), .see-it-action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('See It In Action button clicked');
            window.location.href = 'pages/login.html';
        });
    });
}

// Initialize Reward Tracking
function initializeRewardTracking() {
    console.log('Initializing Reward Tracking');
    
    // VIP status thresholds
    const vipThresholds = {
        silver: 5000,
        gold: 10000,
        platinum: 25000
    };
    
    // Update VIP status based on spend
    const updateVipStatus = function(clientId, totalSpend) {
        let status = 'standard';
        
        if (totalSpend >= vipThresholds.platinum) {
            status = 'platinum';
        } else if (totalSpend >= vipThresholds.gold) {
            status = 'gold';
        } else if (totalSpend >= vipThresholds.silver) {
            status = 'silver';
        }
        
        // Update client VIP status
        console.log(`Client ${clientId} VIP status updated to ${status} based on spend of $${totalSpend}`);
        return status;
    };
    
    // Calculate reward points based on spend
    const calculateRewardPoints = function(spend) {
        // 1 point per $10 spent
        return Math.floor(spend / 10);
    };
    
    // Expose functions globally
    window.rewardTracking = {
        updateVipStatus,
        calculateRewardPoints,
        vipThresholds
    };
}

// Initialize modal dialogs
function initializeModalDialogs() {
    console.log('Initializing modal dialogs');
    
    // Create modal container if it doesn't exist
    if (!document.getElementById('modalContainer')) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modalContainer';
        document.body.appendChild(modalContainer);
    }
    
    // Initialize modal submit buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('modal-submit-btn')) {
            e.preventDefault();
            const modalId = e.target.closest('.modal').id;
            submitModalForm(modalId);
        }
    });
}

// Show a modal dialog
function showModal(modalId) {
    console.log('Showing modal:', modalId);
    
    // Check if modal already exists
    let modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
        // Create modal if it doesn't exist
        createDynamicModal(modalId, getModalTitle(modalId), getModalForm(modalId));
        modalElement = document.getElementById(modalId);
    }
    
    // Show the modal using Bootstrap
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Get modal title based on ID
function getModalTitle(modalId) {
    const titles = {
        'addCommissionModal': 'Add New Commission',
        'addTaskModal': 'Add New Task',
        'addClientModal': 'Add New Client',
        'addBookingModal': 'Add New Booking',
        'addItineraryModal': 'Create New Itinerary',
        'addActivityModal': 'Add New Activity',
        'importSupplierModal': 'Import from Supplier',
        'shareItineraryModal': 'Share Itinerary',
        'newOpportunityModal': 'Add New Opportunity',
        'addTimeEntryModal': 'Add Time Entry',
        'importModal': 'Import Data'
    };
    
    return titles[modalId] || 'Modal Dialog';
}

// Get modal form based on ID
function getModalForm(modalId) {
    const forms = {
        'addCommissionModal': createCommissionForm(),
        'addTaskModal': createTaskForm(),
        'addClientModal': createClientForm(),
        'addBookingModal': createBookingForm(),
        'addItineraryModal': createItineraryForm(),
        'addActivityModal': createActivityForm(),
        'importSupplierModal': createImportSupplierForm(),
        'shareItineraryModal': createShareItineraryForm(),
        'newOpportunityModal': createOpportunityForm(),
        'addTimeEntryModal': createTimeEntryForm(),
        'importModal': createImportForm()
    };
    
    return forms[modalId] || '<p>Modal content not defined.</p>';
}

// Submit a modal form
function submitModalForm(modalId) {
    console.log('Submitting modal form:', modalId);
    
    // Get form data
    const form = document.querySelector(`#${modalId} form`);
    if (!form) {
        console.error(`Form not found in modal: ${modalId}`);
        return;
    }
    
    // Collect form data
    const formData = {};
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name) {
            formData[element.name] = element.value;
        }
    }
    
    // Process form data based on modal type
    switch (modalId) {
        case 'addCommissionModal':
            addCommission(formData);
            break;
        case 'addTaskModal':
            addTask(formData);
            break;
        case 'addClientModal':
            addClient(formData);
            break;
        case 'addBookingModal':
            addBooking(formData);
            break;
        case 'addItineraryModal':
            createItinerary(formData);
            break;
        case 'addActivityModal':
            addActivity(formData);
            break;
        case 'importSupplierModal':
            importFromSupplier(formData);
            break;
        case 'shareItineraryModal':
            shareItinerary(formData);
            break;
        case 'newOpportunityModal':
            addOpportunity(formData);
            break;
        case 'addTimeEntryModal':
            addTimeEntry(formData);
            break;
        case 'importModal':
            importData(formData);
            break;
        default:
            console.error(`Unknown modal type: ${modalId}`);
            return;
    }
    
    // Close the modal
    const modalElement = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // Show success toast
    showToast('Operation completed successfully');
}

// Initialize toast notifications
function initializeToastNotifications() {
    console.log('Initializing toast notifications');
    
    // Create toast container if it doesn't exist
    if (!document.getElementById('toastContainer')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
}

// Show a toast notification
function showToast(message, type = 'success') {
    console.log('Showing toast:', message, type);
    
    const toastContainer = document.getElementById('toastContainer');
    
    // Create toast HTML
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-${type} text-white">
                <strong class="me-auto">Just Travel Solutions CRM</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    // Add toast to container
    toastContainer.innerHTML += toastHTML;
    
    // Show the toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove toast after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

// Initialize dashboard charts
function initializeDashboardCharts() {
    console.log('Initializing dashboard charts');
    
    // Create placeholder charts if real data is not available
    createRevenueChart();
    createBookingSourcesChart();
}

// Create revenue chart
function createRevenueChart() {
    const chartCanvas = document.getElementById('revenueChart');
    if (!chartCanvas) {
        console.log('Revenue chart canvas not found');
        return;
    }
    
    // Create placeholder image for chart
    const chartImg = document.createElement('img');
    chartImg.src = '../images/screenshots/revenue-chart.jpg';
    chartImg.alt = 'Revenue & Bookings Chart';
    chartImg.className = 'img-fluid';
    
    // Replace canvas with image
    chartCanvas.parentNode.replaceChild(chartImg, chartCanvas);
}

// Create booking sources chart
function createBookingSourcesChart() {
    const chartCanvas = document.getElementById('bookingSourcesChart');
    if (!chartCanvas) {
        console.log('Booking sources chart canvas not found');
        return;
    }
    
    // Create placeholder image for chart
    const chartImg = document.createElement('img');
    chartImg.src = '../images/screenshots/booking-sources.jpg';
    chartImg.alt = 'Booking Sources Chart';
    chartImg.className = 'img-fluid';
    
    // Replace canvas with image
    chartCanvas.parentNode.replaceChild(chartImg, chartCanvas);
}

// Form creation functions
function createCommissionForm() {
    return `
        <form id="commissionForm">
            <div class="mb-3">
                <label for="supplier" class="form-label">Supplier</label>
                <input type="text" class="form-control" id="supplier" name="supplier" required>
            </div>
            <div class="mb-3">
                <label for="booking" class="form-label">Booking</label>
                <select class="form-select" id="booking" name="booking" required>
                    <option value="">Select a booking</option>
                    <option value="booking1">Smith Family Cruise</option>
                    <option value="booking2">Johnson Paris Trip</option>
                    <option value="booking3">Brown Tokyo Flights</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="amount" class="form-label">Commission Amount</label>
                <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" id="amount" name="amount" step="0.01" required>
                </div>
            </div>
            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select class="form-select" id="status" name="status" required>
                    <option value="pending">Pending</option>
                    <option value="invoiced">Invoiced</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="dueDate" class="form-label">Due Date</label>
                <input type="date" class="form-control" id="dueDate" name="dueDate" required>
            </div>
            <div class="mb-3">
                <label for="notes" class="form-label">Notes</label>
                <textarea class="form-control" id="notes" name="notes" rows="3"></textarea>
            </div>
        </form>
    `;
}

function createTaskForm() {
    return `
        <form id="taskForm">
            <div class="mb-3">
                <label for="taskTitle" class="form-label">Task Title</label>
                <input type="text" class="form-control" id="taskTitle" name="taskTitle" required>
            </div>
            <div class="mb-3">
                <label for="taskDescription" class="form-label">Description</label>
                <textarea class="form-control" id="taskDescription" name="taskDescription" rows="3"></textarea>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="taskPriority" class="form-label">Priority</label>
                    <select class="form-select" id="taskPriority" name="taskPriority" required>
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="taskDueDate" class="form-label">Due Date</label>
                    <input type="date" class="form-control" id="taskDueDate" name="taskDueDate" required>
                </div>
            </div>
            <div class="mb-3">
                <label for="taskAssignee" class="form-label">Assignee</label>
                <select class="form-select" id="taskAssignee" name="taskAssignee">
                    <option value="me" selected>Me</option>
                    <option value="user1">John Smith</option>
                    <option value="user2">Sarah Johnson</option>
                    <option value="user3">Michael Brown</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="taskRelatedTo" class="form-label">Related To</label>
                <select class="form-select" id="taskRelatedTo" name="taskRelatedTo">
                    <option value="">None</option>
                    <option value="client1">Client: Smith Family</option>
                    <option value="booking1">Booking: Smith Family Cruise</option>
                    <option value="itinerary1">Itinerary: Europe Tour 2025</option>
                </select>
            </div>
        </form>
    `;
}

function createClientForm() {
    return `
        <form id="clientForm">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">First Name*</label>
                    <input type="text" class="form-control" id="firstName" name="firstName" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Last Name*</label>
                    <input type="text" class="form-control" id="lastName" name="lastName" required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">Email*</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="phone" class="form-label">Phone*</label>
                    <input type="tel" class="form-control" id="phone" name="phone" required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="birthdate" class="form-label">Birthdate</label>
                    <input type="date" class="form-control birthdate-picker" id="birthdate" name="birthdate">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="clientStatus" class="form-label">Status*</label>
                    <select class="form-select" id="clientStatus" name="clientStatus" required>
                        <option value="active" selected>Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="lead">Lead</option>
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Passport Details</label>
                <div class="row g-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control passport-field" placeholder="Passport Number" name="passportNumber" data-field="number">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control passport-field" placeholder="Issuing Country" name="passportCountry" data-field="country">
                    </div>
                    <div class="col-md-6">
                        <input type="date" class="form-control passport-field" placeholder="Issue Date" name="passportIssueDate" data-field="issueDate">
                    </div>
                    <div class="col-md-6">
                        <input type="date" class="form-control passport-field" placeholder="Expiry Date" name="passportExpiryDate" data-field="expiryDate">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" name="address">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="city" class="form-label">City</label>
                    <input type="text" class="form-control" id="city" name="city">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="state" class="form-label">State/Province</label>
                    <input type="text" class="form-control" id="state" name="state">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="zipCode" class="form-label">Zip/Postal Code</label>
                    <input type="text" class="form-control" id="zipCode" name="zipCode">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="country" class="form-label">Country</label>
                    <select class="form-select" id="country" name="country">
                        <option value="US" selected>United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <label for="clientNotes" class="form-label">Notes</label>
                <textarea class="form-control" id="clientNotes" name="clientNotes" rows="3"></textarea>
            </div>
        </form>
    `;
}

function createBookingForm() {
    return `
        <form id="bookingForm">
            <div class="mb-3">
                <label for="bookingClient" class="form-label">Client*</label>
                <select class="form-select" id="bookingClient" name="bookingClient" required>
                    <option value="">Select a client</option>
                    <option value="client1">John & Sarah Johnson</option>
                    <option value="client2">Michael & Lisa Smith</option>
                    <option value="client3">Robert & Jennifer Wilson</option>
                </select>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="bookingType" class="form-label">Booking Type*</label>
                    <select class="form-select" id="bookingType" name="bookingType" required>
                        <option value="">Select type</option>
                        <option value="cruise">Cruise</option>
                        <option value="hotel">Hotel</option>
                        <option value="flight">Flight</option>
                        <option value="package">Package</option>
                        <option value="tour">Tour</option>
                        <option value="car">Car Rental</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="bookingStatus" class="form-label">Status*</label>
                    <select class="form-select" id="bookingStatus" name="bookingStatus" required>
                        <option value="inquiry">Inquiry</option>
                        <option value="quoted">Quoted</option>
                        <option value="pending" selected>Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="bookingStartDate" class="form-label">Start Date*</label>
                    <input type="date" class="form-control" id="bookingStartDate" name="bookingStartDate" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="bookingEndDate" class="form-label">End Date*</label>
                    <input type="date" class="form-control" id="bookingEndDate" name="bookingEndDate" required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="bookingDestination" class="form-label">Destination</label>
                    <input type="text" class="form-control" id="bookingDestination" name="bookingDestination">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="bookingSupplier" class="form-label">Supplier</label>
                    <input type="text" class="form-control" id="bookingSupplier" name="bookingSupplier">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="bookingValue" class="form-label">Booking Value*</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="bookingValue" name="bookingValue" step="0.01" required>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="bookingCommission" class="form-label">Commission</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="bookingCommission" name="bookingCommission" step="0.01">
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label for="bookingNotes" class="form-label">Notes</label>
                <textarea class="form-control" id="bookingNotes" name="bookingNotes" rows="3"></textarea>
            </div>
        </form>
    `;
}

function createItineraryForm() {
    return `
        <form id="itineraryForm">
            <div class="mb-3">
                <label for="itineraryName" class="form-label">Itinerary Name*</label>
                <input type="text" class="form-control" id="itineraryName" name="itineraryName" required>
            </div>
            <div class="mb-3">
                <label for="itineraryClient" class="form-label">Client</label>
                <select class="form-select" id="itineraryClient" name="itineraryClient">
                    <option value="">Select a client</option>
                    <option value="client1">John & Sarah Johnson</option>
                    <option value="client2">Michael & Lisa Smith</option>
                    <option value="client3">Robert & Jennifer Wilson</option>
                </select>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="itineraryStartDate" class="form-label">Start Date*</label>
                    <input type="date" class="form-control" id="itineraryStartDate" name="itineraryStartDate" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="itineraryEndDate" class="form-label">End Date*</label>
                    <input type="date" class="form-control" id="itineraryEndDate" name="itineraryEndDate" required>
                </div>
            </div>
            <div class="mb-3">
                <label for="itineraryDestination" class="form-label">Destination(s)</label>
                <input type="text" class="form-control" id="itineraryDestination" name="itineraryDestination">
            </div>
            <div class="mb-3">
                <label for="itineraryDescription" class="form-label">Description</label>
                <textarea class="form-control" id="itineraryDescription" name="itineraryDescription" rows="3"></textarea>
            </div>
        </form>
    `;
}

function createActivityForm() {
    return `
        <form id="activityForm">
            <div class="mb-3">
                <label for="activityName" class="form-label">Activity Name*</label>
                <input type="text" class="form-control" id="activityName" name="activityName" required>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="activityDay" class="form-label">Day*</label>
                    <select class="form-select" id="activityDay" name="activityDay" required>
                        <option value="1">Day 1</option>
                        <option value="2">Day 2</option>
                        <option value="3">Day 3</option>
                        <option value="4">Day 4</option>
                        <option value="5">Day 5</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="activityTime" class="form-label">Time</label>
                    <input type="time" class="form-control" id="activityTime" name="activityTime">
                </div>
            </div>
            <div class="mb-3">
                <label for="activityLocation" class="form-label">Location</label>
                <input type="text" class="form-control" id="activityLocation" name="activityLocation">
            </div>
            <div class="mb-3">
                <label for="activityDescription" class="form-label">Description</label>
                <textarea class="form-control" id="activityDescription" name="activityDescription" rows="3"></textarea>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="activityCost" class="form-label">Cost</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="activityCost" name="activityCost" step="0.01">
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="activityDuration" class="form-label">Duration</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="activityDuration" name="activityDuration">
                        <span class="input-group-text">hours</span>
                    </div>
                </div>
            </div>
        </form>
    `;
}

function createImportSupplierForm() {
    return `
        <form id="importSupplierForm">
            <div class="mb-3">
                <label for="supplier" class="form-label">Supplier*</label>
                <select class="form-select" id="supplier" name="supplier" required>
                    <option value="">Select a supplier</option>
                    <option value="supplier1">Royal Caribbean</option>
                    <option value="supplier2">Marriott Hotels</option>
                    <option value="supplier3">Delta Airlines</option>
                    <option value="supplier4">Hertz Car Rental</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="bookingReference" class="form-label">Booking Reference*</label>
                <input type="text" class="form-control" id="bookingReference" name="bookingReference" required>
            </div>
            <div class="mb-3">
                <label for="importType" class="form-label">Import Type*</label>
                <select class="form-select" id="importType" name="importType" required>
                    <option value="itinerary">Itinerary</option>
                    <option value="booking">Booking Details</option>
                    <option value="both" selected>Both</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="clientAssignment" class="form-label">Assign to Client</label>
                <select class="form-select" id="clientAssignment" name="clientAssignment">
                    <option value="">Select a client</option>
                    <option value="client1">John & Sarah Johnson</option>
                    <option value="client2">Michael & Lisa Smith</option>
                    <option value="client3">Robert & Jennifer Wilson</option>
                </select>
            </div>
        </form>
    `;
}

function createShareItineraryForm() {
    return `
        <form id="shareItineraryForm">
            <div class="mb-3">
                <label for="shareMethod" class="form-label">Share Method*</label>
                <select class="form-select" id="shareMethod" name="shareMethod" required>
                    <option value="email" selected>Email</option>
                    <option value="link">Shareable Link</option>
                    <option value="pdf">PDF Download</option>
                </select>
            </div>
            <div class="mb-3 email-share-option">
                <label for="recipientEmail" class="form-label">Recipient Email*</label>
                <input type="email" class="form-control" id="recipientEmail" name="recipientEmail">
            </div>
            <div class="mb-3">
                <label for="shareMessage" class="form-label">Message</label>
                <textarea class="form-control" id="shareMessage" name="shareMessage" rows="3"></textarea>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="includeBookingDetails" name="includeBookingDetails" checked>
                    <label class="form-check-label" for="includeBookingDetails">
                        Include Booking Details
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="includePricing" name="includePricing">
                    <label class="form-check-label" for="includePricing">
                        Include Pricing Information
                    </label>
                </div>
            </div>
        </form>
    `;
}

function createOpportunityForm() {
    return `
        <form id="opportunityForm">
            <div class="mb-3">
                <label for="opportunityName" class="form-label">Opportunity Name*</label>
                <input type="text" class="form-control" id="opportunityName" name="opportunityName" required>
            </div>
            <div class="mb-3">
                <label for="opportunityClient" class="form-label">Client*</label>
                <select class="form-select" id="opportunityClient" name="opportunityClient" required>
                    <option value="">Select a client</option>
                    <option value="client1">John & Sarah Johnson</option>
                    <option value="client2">Michael & Lisa Smith</option>
                    <option value="client3">Robert & Jennifer Wilson</option>
                </select>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="opportunityType" class="form-label">Type*</label>
                    <select class="form-select" id="opportunityType" name="opportunityType" required>
                        <option value="cruise">Cruise</option>
                        <option value="hotel">Hotel</option>
                        <option value="flight">Flight</option>
                        <option value="package">Package</option>
                        <option value="tour">Tour</option>
                        <option value="car">Car Rental</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="opportunityStage" class="form-label">Stage*</label>
                    <select class="form-select" id="opportunityStage" name="opportunityStage" required>
                        <option value="lead">Lead</option>
                        <option value="qualified">Qualified</option>
                        <option value="proposal">Proposal</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="closed_won">Closed Won</option>
                        <option value="closed_lost">Closed Lost</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="opportunityValue" class="form-label">Estimated Value*</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="opportunityValue" name="opportunityValue" step="0.01" required>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="opportunityCloseDate" class="form-label">Expected Close Date*</label>
                    <input type="date" class="form-control" id="opportunityCloseDate" name="opportunityCloseDate" required>
                </div>
            </div>
            <div class="mb-3">
                <label for="opportunityDescription" class="form-label">Description</label>
                <textarea class="form-control" id="opportunityDescription" name="opportunityDescription" rows="3"></textarea>
            </div>
        </form>
    `;
}

function createTimeEntryForm() {
    return `
        <form id="timeEntryForm">
            <div class="mb-3">
                <label for="timeEntryDate" class="form-label">Date*</label>
                <input type="date" class="form-control" id="timeEntryDate" name="timeEntryDate" required>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="timeEntryStart" class="form-label">Start Time*</label>
                    <input type="time" class="form-control" id="timeEntryStart" name="timeEntryStart" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="timeEntryEnd" class="form-label">End Time*</label>
                    <input type="time" class="form-control" id="timeEntryEnd" name="timeEntryEnd" required>
                </div>
            </div>
            <div class="mb-3">
                <label for="timeEntryDescription" class="form-label">Description*</label>
                <textarea class="form-control" id="timeEntryDescription" name="timeEntryDescription" rows="3" required></textarea>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="timeEntryClient" class="form-label">Client</label>
                    <select class="form-select" id="timeEntryClient" name="timeEntryClient">
                        <option value="">Select a client</option>
                        <option value="client1">John & Sarah Johnson</option>
                        <option value="client2">Michael & Lisa Smith</option>
                        <option value="client3">Robert & Jennifer Wilson</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="timeEntryProject" class="form-label">Project/Booking</label>
                    <select class="form-select" id="timeEntryProject" name="timeEntryProject">
                        <option value="">Select a project/booking</option>
                        <option value="booking1">Smith Family Cruise</option>
                        <option value="booking2">Johnson Paris Trip</option>
                        <option value="booking3">Brown Tokyo Flights</option>
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <label for="timeEntryBillable" class="form-label">Billable</label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="timeEntryBillable" name="timeEntryBillable">
                    <label class="form-check-label" for="timeEntryBillable">
                        Mark as billable time
                    </label>
                </div>
            </div>
        </form>
    `;
}

function createImportForm(dataType = 'generic') {
    return `
        <form id="importForm">
            <div class="mb-3">
                <label for="importFile" class="form-label">Select File*</label>
                <input type="file" class="form-control" id="importFile" name="importFile" required>
                <small class="text-muted">Supported formats: CSV, Excel</small>
            </div>
            <div class="mb-3">
                <label for="importType" class="form-label">Import Type*</label>
                <select class="form-select" id="importType" name="importType" required>
                    <option value="clients" ${dataType === 'clients' ? 'selected' : ''}>Clients</option>
                    <option value="bookings" ${dataType === 'bookings' ? 'selected' : ''}>Bookings</option>
                    <option value="commissions" ${dataType === 'commissions' ? 'selected' : ''}>Commissions</option>
                    <option value="tasks" ${dataType === 'tasks' ? 'selected' : ''}>Tasks</option>
                </select>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="updateExisting" name="updateExisting" checked>
                    <label class="form-check-label" for="updateExisting">
                        Update existing records
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="skipHeader" name="skipHeader" checked>
                    <label class="form-check-label" for="skipHeader">
                        First row contains headers
                    </label>
                </div>
            </div>
        </form>
    `;
}

// Demo functionality implementations
function addCommission(formData) {
    console.log('Adding commission:', formData);
    // In a real application, this would save the commission data to the database
    // For demo purposes, we'll just log the data
}

function filterCommissions(filter) {
    console.log('Filtering commissions by:', filter);
    // In a real application, this would filter the commissions list
    // For demo purposes, we'll just log the filter
}

function updateCommissionStatus(commissionId, status) {
    console.log('Updating commission status:', commissionId, status);
    // In a real application, this would update the commission status in the database
    // For demo purposes, we'll just log the data
}

function addTask(formData) {
    console.log('Adding task:', formData);
    // In a real application, this would save the task data to the database
    // For demo purposes, we'll just log the data
}

function updateTaskStatus(taskId, completed) {
    console.log('Updating task status:', taskId, completed);
    // In a real application, this would update the task status in the database
    // For demo purposes, we'll just log the data
}

function filterTasks(filter) {
    console.log('Filtering tasks by:', filter);
    // In a real application, this would filter the tasks list
    // For demo purposes, we'll just log the filter
}

function addClient(formData) {
    console.log('Adding client:', formData);
    // In a real application, this would save the client data to the database
    // For demo purposes, we'll just log the data
}

function filterClients(filter) {
    console.log('Filtering clients by:', filter);
    // In a real application, this would filter the clients list
    // For demo purposes, we'll just log the filter
}

function applyClientFilters() {
    console.log('Applying client filters');
    // In a real application, this would apply all selected filters to the clients list
    // For demo purposes, we'll just log the action
}

function resetClientFilters() {
    console.log('Resetting client filters');
    // In a real application, this would reset all filters to their default values
    // For demo purposes, we'll just log the action
}

function updateClientBirthdate(clientId, birthdate) {
    console.log('Updating client birthdate:', clientId, birthdate);
    // In a real application, this would update the client birthdate in the database
    // For demo purposes, we'll just log the data
}

function updateClientPassport(clientId, fieldType, value) {
    console.log('Updating client passport:', clientId, fieldType, value);
    // In a real application, this would update the client passport in the database
    // For demo purposes, we'll just log the data
}

function updateClientRelationship(clientId, relatedId, relationship) {
    console.log('Updating client relationship:', clientId, relatedId, relationship);
    // In a real application, this would update the client relationship in the database
    // For demo purposes, we'll just log the data
}

function updateClientRewards(clientId, points) {
    console.log('Updating client rewards:', clientId, points);
    // In a real application, this would update the client rewards in the database
    // For demo purposes, we'll just log the data
}

function addBooking(formData) {
    console.log('Adding booking:', formData);
    // In a real application, this would save the booking data to the database
    // For demo purposes, we'll just log the data
    
    // Trigger booking created event for reward tracking
    if (formData.bookingClient && formData.bookingValue) {
        const bookingCreatedEvent = new CustomEvent('bookingCreated', {
            detail: {
                clientId: formData.bookingClient,
                bookingValue: formData.bookingValue
            }
        });
        document.dispatchEvent(bookingCreatedEvent);
    }
}

function filterBookings(filter) {
    console.log('Filtering bookings by:', filter);
    // In a real application, this would filter the bookings list
    // For demo purposes, we'll just log the filter
}

function updateBookingStatus(bookingId, status) {
    console.log('Updating booking status:', bookingId, status);
    // In a real application, this would update the booking status in the database
    // For demo purposes, we'll just log the data
}

function exportData(dataType) {
    console.log('Exporting data:', dataType);
    // In a real application, this would generate and download a file
    // For demo purposes, we'll just log the data type
}

function createItinerary(formData) {
    console.log('Creating itinerary:', formData);
    // In a real application, this would save the itinerary data to the database
    // For demo purposes, we'll just log the data
}

function addItineraryDay() {
    console.log('Adding itinerary day');
    // In a real application, this would add a new day to the itinerary
    // For demo purposes, we'll just log the action
}

function addActivity(formData) {
    console.log('Adding activity:', formData);
    // In a real application, this would save the activity data to the database
    // For demo purposes, we'll just log the data
}

function importFromSupplier(formData) {
    console.log('Importing from supplier:', formData);
    // In a real application, this would import data from the supplier's API
    // For demo purposes, we'll just log the data
}

function shareItinerary(formData) {
    console.log('Sharing itinerary:', formData);
    // In a real application, this would share the itinerary via the selected method
    // For demo purposes, we'll just log the data
}

function addOpportunity(formData) {
    console.log('Adding opportunity:', formData);
    // In a real application, this would save the opportunity data to the database
    // For demo purposes, we'll just log the data
}

function moveOpportunityStage(opportunityId, direction) {
    console.log('Moving opportunity stage:', opportunityId, direction);
    // In a real application, this would update the opportunity stage in the database
    // For demo purposes, we'll just log the data
}

function startTimer() {
    console.log('Starting timer');
    // In a real application, this would start a timer
    // For demo purposes, we'll just log the action
}

function stopTimer() {
    console.log('Stopping timer');
    // In a real application, this would stop the timer and prompt for details
    // For demo purposes, we'll just log the action
}

function addTimeEntry(formData) {
    console.log('Adding time entry:', formData);
    // In a real application, this would save the time entry data to the database
    // For demo purposes, we'll just log the data
}

function generateTimeReport(reportType) {
    console.log('Generating time report:', reportType);
    // In a real application, this would generate a time report
    // For demo purposes, we'll just log the report type
}

function importData(formData) {
    console.log('Importing data:', formData);
    // In a real application, this would import data from the selected file
    // For demo purposes, we'll just log the data
}

// Add a polyfill for :contains selector
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Add a custom selector for :contains
document.querySelectorAll = (function(native) {
    return function(selector) {
        if (selector.includes(':contains(')) {
            // Extract the text to search for
            const containsText = selector.match(/:contains\((['"])(.*?)\1\)/)[2];
            const newSelector = selector.replace(/:contains\((['"])(.*?)\1\)/, '');
            
            // Get elements matching the new selector
            const elements = Array.from(native.call(this, newSelector));
            
            // Filter elements that contain the text
            return elements.filter(el => el.textContent.includes(containsText));
        } else {
            return native.call(this, selector);
        }
    };
})(document.querySelectorAll);
