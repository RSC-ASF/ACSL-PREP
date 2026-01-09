// Authentication Module
import {
    auth,
    db,
    googleProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from './firebase-config.js';

// Current user state
let currentUser = null;

// Auth state change listener
onAuthStateChanged(auth, async (user) => {
    currentUser = user;

    if (user) {
        // User is signed in
        await createOrUpdateUserProfile(user);
        updateUIForSignedInUser(user);
    } else {
        // User is signed out
        updateUIForSignedOutUser();
    }

    // Dispatch custom event for other modules
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
});

// Create or update user profile in Firestore
async function createOrUpdateUserProfile(user) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        // New user - create profile
        await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
            progress: {
                contest1: { short: [], programming: [] },
                contest2: { short: [], programming: [] },
                contest3: { short: [], programming: [] },
                contest4: { short: [], programming: [] }
            },
            stats: {
                totalProblemsCompleted: 0,
                shortProblemsCompleted: 0,
                programmingProblemsCompleted: 0,
                contestsStarted: 0
            }
        });
    } else {
        // Existing user - update last login
        await setDoc(userRef, {
            lastLoginAt: serverTimestamp(),
            displayName: user.displayName,
            photoURL: user.photoURL
        }, { merge: true });
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        showToast('Welcome, ' + result.user.displayName + '!', 'success');
        return result.user;
    } catch (error) {
        console.error('Sign in error:', error);
        showToast('Sign in failed. Please try again.', 'error');
        throw error;
    }
}

// Sign out
async function handleSignOut() {
    try {
        await signOut(auth);
        showToast('Signed out successfully', 'info');
    } catch (error) {
        console.error('Sign out error:', error);
        showToast('Sign out failed', 'error');
    }
}

// Update UI for signed in user
function updateUIForSignedInUser(user) {
    const authNav = document.getElementById('auth-nav');
    const userNav = document.getElementById('user-nav');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const ctaSection = document.getElementById('cta-section');

    if (authNav) authNav.classList.add('hidden');
    if (userNav) {
        userNav.classList.remove('hidden');
        if (userAvatar) userAvatar.src = user.photoURL || 'https://via.placeholder.com/32';
        if (userName) userName.textContent = user.displayName?.split(' ')[0] || 'User';
    }
    if (ctaSection) ctaSection.classList.add('hidden');
}

// Update UI for signed out user
function updateUIForSignedOutUser() {
    const authNav = document.getElementById('auth-nav');
    const userNav = document.getElementById('user-nav');
    const ctaSection = document.getElementById('cta-section');

    if (authNav) authNav.classList.remove('hidden');
    if (userNav) userNav.classList.add('hidden');
    if (ctaSection) ctaSection.classList.remove('hidden');
}

// Toast notification helper
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Check if user is authenticated
function isAuthenticated() {
    return currentUser !== null;
}

// Export functions
export {
    signInWithGoogle,
    handleSignOut,
    getCurrentUser,
    isAuthenticated,
    showToast
};

// Make functions available globally for onclick handlers
window.signInWithGoogle = signInWithGoogle;
window.handleSignOut = handleSignOut;
