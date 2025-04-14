// Add this to all HTML files to handle missing images
document.addEventListener('DOMContentLoaded', function() {
    // Create placeholders for missing user avatars
    document.querySelectorAll('img[src$="user-avatar.png"], img[src$="user-avatar.jpg"]').forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.className = 'avatar-placeholder';
        placeholder.textContent = 'U';
        img.parentNode.insertBefore(placeholder, img.nextSibling);
    });
    
    // Create placeholders for missing supplier logos
    document.querySelectorAll('img[src*="supplier-logo"]').forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-image';
        placeholder.textContent = 'Supplier';
        img.parentNode.insertBefore(placeholder, img.nextSibling);
    });
    
    // Create placeholders for missing library images
    document.querySelectorAll('img[src*="library"]').forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-image';
        placeholder.textContent = 'Image';
        img.parentNode.insertBefore(placeholder, img.nextSibling);
    });
    
    // Create placeholders for missing itinerary images
    document.querySelectorAll('img[src*="itinerary"]').forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-image';
        placeholder.textContent = 'Destination';
        img.parentNode.insertBefore(placeholder, img.nextSibling);
    });
    
    // Create placeholders for missing screenshot images
    document.querySelectorAll('img[src*="screenshots"]').forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.className = 'chart-placeholder';
        placeholder.textContent = 'Chart Data Visualization';
        img.parentNode.insertBefore(placeholder, img.nextSibling);
    });
});
