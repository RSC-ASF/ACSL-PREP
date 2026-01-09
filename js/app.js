// Main Application Module
import { signInWithGoogle, handleSignOut } from './auth.js';
import { db, collection, query, orderBy, limit, getDocs, doc, getDoc } from './firebase-config.js';

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupAuthButtons();
    loadStats();
}

// Mobile Navigation Toggle
function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Setup auth button handlers
function setupAuthButtons() {
    const signInBtn = document.getElementById('sign-in-btn');
    const signOutBtn = document.getElementById('sign-out-btn');
    const ctaSignIn = document.getElementById('cta-sign-in');

    if (signInBtn) {
        signInBtn.addEventListener('click', signInWithGoogle);
    }

    if (signOutBtn) {
        signOutBtn.addEventListener('click', handleSignOut);
    }

    if (ctaSignIn) {
        ctaSignIn.addEventListener('click', signInWithGoogle);
    }
}

// Load global stats
async function loadStats() {
    try {
        // Get total users count
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const totalUsers = usersSnapshot.size;

        const totalUsersEl = document.getElementById('total-users');
        if (totalUsersEl) {
            totalUsersEl.textContent = totalUsers;
        }
    } catch (error) {
        console.log('Stats loading skipped - user may not be authenticated');
    }
}

// Utility function to get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Export utilities
export { getUrlParam };
window.getUrlParam = getUrlParam;
