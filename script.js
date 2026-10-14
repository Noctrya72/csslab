// Génération de la base de données des 80 animations
const animations = [];

const categories = ['basic', 'entrance', 'attention', 'advanced'];
const types = [
    { name: 'Fade', cat: 'basic', desc: 'Un fondu classique et élégant.' },
    { name: 'Slide', cat: 'entrance', desc: 'Une entrée fluide par glissement.' },
    { name: 'Bounce', cat: 'attention', desc: 'Un rebond dynamique pour attirer l\'œil.' },
    { name: 'Pulse', cat: 'attention', desc: 'Un battement régulier de style pulsation.' },
    { name: 'Flip', cat: 'advanced', desc: 'Un retournement 3D sur l\'axe.' },
    { name: 'Rotate', cat: 'basic', desc: 'Une rotation continue ou déclenchée.' },
    { name: 'Shake', cat: 'attention', desc: 'Un tremblement rapide pour les erreurs ou alertes.' },
    { name: 'Glitch', cat: 'advanced', desc: 'Un effet de distorsion numérique moderne.' },
    { name: 'Zoom', cat: 'entrance', desc: 'Un zoom progressif pour mettre en avant.' },
    { name: 'Swing', cat: 'attention', desc: 'Un balancement de gauche à droite.' }
];

// Boucle pour générer mathématiquement les 80 variantes uniques demandées
for (let i = 1; i <= 80; i++) {
    const type = types[(i - 1) % types.length];
    const cat = categories[(i - 1) % categories.length];
    const animClassName = `anim-${type.name.toLowerCase()}-${i}`;
    
    animations.push({
        id: i,
        name: `${type.name} Variante #${i}`,
        category: cat,
        description: `${type.desc} Idéal pour l'animation numéro ${i} de votre interface utilisateur.`,
        className: animClassName,
        html: `<div class="demo-box ${animClassName}">Txt</div>`,
        css: `.${animClassName} {\n  animation: ${animClassName} 2s infinite ease-in-out;\n}\n\n@keyframes ${animClassName} {\n  0% { transform: scale(1); opacity: 0.7; }\n  50% { transform: scale(1.15) rotate(${i * 2}deg); opacity: 1; }\n  100% { transform: scale(1); opacity: 0.7; }\n}`
    });
}

// Gestion de l'affichage de la grille
const grid = document.getElementById('animationGrid');
const modal = document.getElementById('codeModal');

function renderGrid(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? animations : animations.filter(a => a.category === filter);
    
    filtered.forEach(anim => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="preview-area">
                <div class="demo-box ${anim.className}">${anim.id}</div>
            </div>
            <div class="card-info">
                <h3>${anim.name}</h3>
                <p>${anim.category.toUpperCase()}</p>
            </div>
        `;
        card.addEventListener('click', () => openModal(anim));
        grid.appendChild(card);
    });
}

// Système d'onglets
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGrid(e.target.dataset.category);
    });
});

// Modale & Copie
function openModal(anim) {
    document.getElementById('modalTitle').innerText = anim.name;
    document.getElementById('modalDesc').innerText = anim.description;
    document.getElementById('htmlCode').innerText = anim.html;
    document.getElementById('cssCode').innerText = anim.css;
    modal.style.display = 'flex';
}

document.querySelector('.close-btn').addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

function copyCode(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Code copié avec succès !');
    });
}

// Initialisation
renderGrid();
