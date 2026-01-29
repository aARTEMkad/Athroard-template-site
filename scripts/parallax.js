const dog_parallax = document.querySelector('.dog--parallax');

window.addEventListener('scroll', () => {
    const rect = dog_parallax.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let startOffSet = 0.85;
    let endOffSet = 0.6;
    let progress = (windowHeight * (1 - startOffSet - endOffSet)) / (windowHeight - rect.top - windowHeight * startOffSet);

    if(Math.min(Math.max(progress, 0), 1) == 0) progress = 1;
    else progress = Math.min(Math.max(progress, 0), 1);

    dog_parallax.style.transform = `translateY(${100 - 100 * progress}%)`
});