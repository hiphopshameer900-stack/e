// Function to show individual lines inside a specific active scene container
function runSceneAnimations(sceneElement) {
    const lines = sceneElement.querySelectorAll('.text-line, .promise-card');
    let maxDelay = 0;

    lines.forEach(line => {
        const currentDelay = parseInt(line.getAttribute('data-delay') || 0);
        if (currentDelay > maxDelay) maxDelay = currentDelay;

        setTimeout(() => {
            line.classList.add('visible');
        }, currentDelay);
    });

    // Special trigger to drop open the letter envelope if inside Scene 6
    if(sceneElement.id === 'scene6') {
        setTimeout(() => {
            const env = document.getElementById('letterEnvelope');
            if(env) env.classList.add('open');
        }, 800);
        maxDelay += 1500;
    }

    // Reveal the scene navigation button cleanly ONLY after the text elements are complete
    const nextBtn = sceneElement.querySelector('.btn');
    if (nextBtn) {
        setTimeout(() => {
            nextBtn.classList.add('show-btn');
        }, maxDelay + 1000);
    }
}

// Global scene setup initialization
document.addEventListener('DOMContentLoaded', () => {
    const primaryScene = document.getElementById('scene1');
    if (primaryScene) {
        runSceneAnimations(primaryScene);
    }

    // Capture button clicks to dynamically change scenes
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentScene = e.target.closest('.scene');
            const targetSceneId = e.target.getAttribute('data-next');
            const nextScene = document.getElementById(targetSceneId);

            if (currentScene && nextScene) {
                // Handle changes to background environment state classes on body
                if (targetSceneId === 'scene2') document.body.className = 'galaxy-state';
                if (targetSceneId === 'scene3') document.body.className = 'storm';
                if (targetSceneId === 'scene4' || targetSceneId === 'scene5') document.body.className = 'sunrise';
                if (targetSceneId === 'scene6' || targetSceneId === 'scene7') document.body.className = 'galaxy-state';

                // Fade out current scene layout container cleanly
                currentScene.classList.remove('active');
                
                setTimeout(() => {
                    currentScene.style.display = 'none';
                    nextScene.style.display = 'flex';
                    window.scrollTo(0, 0); // Reset page layout scroll position automatically
                    
                    setTimeout(() => {
                        nextScene.classList.add('active');
                        runSceneAnimations(nextScene);
                    }, 50);
                }, 1200);
            }
        });
    });

    // Handle Final Screen Button Action
    const finalBtn = document.getElementById('finalBtn');
    if (finalBtn) {
        finalBtn.addEventListener('click', () => {
            document.body.style.background = 'radial-gradient(circle at center, #ffffff 0%, #ffeef2 100%)';
            document.body.style.color = '#ff416c';
            finalBtn.style.display = 'none';
            
            const tbcText = document.getElementById('toBeContinued');
            if(tbcText) {
                tbcText.style.display = 'block';
                setTimeout(() => { tbcText.classList.add('visible'); }, 100);
            }
        });
    }
});
