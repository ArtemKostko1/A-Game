//header dropdown
$(document).ready(function(){
    $(".dropdown-trigger").dropdown({
        coverTrigger: false
    });
});

//home carousel
$(document).ready(function(){
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        duration: 300
    });
});

//game addition&editing
$(document).ready(function(){
    $('select').formSelect();
});

$(document).ready(function() {
    $('input#name, input#ganre, input#description, input#autor, input#password').characterCounter();
});

$(document).ready(function(){
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        autoClose: true
    });
});

$(document).ready(function(){
    $('select').formSelect();
});

$(document).ready(function(){
    $('.tabs').tabs();
});

//Date format
const toDate = date => {
    return new Intl.DateTimeFormat('ru-RU', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date(date));
};

document.querySelectorAll('.releaseDate').forEach(node => {
    node.textContent = toDate(node.textContent);
});

//remove game from library
const $library = document.querySelector('#library');

if($library) {
    $library.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id;
            const csrf = event.target.dataset.csrf;
            
            fetch('/library/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                },
            })
                .then(res => res.json())
                .then(library => {
                    if (library.games.length) {
                        const html = library.games.map(g => {
                            return `
                                <div class = "col s12 m4">
                                    <div class="card smol game_container">
                                        <div class="card-image waves-effect waves-block waves-light">
                                            <img class="activator" src="${g.imgUrl}" alt="${g.name}">
                                        </div>

                                        <div class="card-reveal">
                                            <p class="card-title grey-text text-darken-4">${g.name}<i class="material-icons right">close</i></p>
                                            <p>Ganre: <span class="ganre">${g.ganre}</span></p>
                                            <p>Age Limit: <span class="ageLimit">${g.ageLimit}</span></p>
                                            <p>Developer: <span class="developer">${g.developer}</span></p>
                                            <p>Release Date: <span class="releaseDate">${g.releaseDate}</span></p>
                                            <p>Description: <span class="description">${g.description}</span></p>
                                        </div>

                                        <div class="card-action">
                                            <div class="row">
                                                <div class="col s12 m6">
                                                    <button class="card-action_btn waves-effect btn-large js-remove" data-id="${g.id}">Delete</button>
                                                </div>
                                                <div class="col s12 m6">
                                                    <button class="card-action_btn waves-effect btn-large">Raiting</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('');
                        $library.querySelector('section').innerHTML = html;
                    } else {
                        $library.innerHTML = `
                        <div class="emtyLibrary_wrapper">
                            <div>
                                <h1>Library is empty</h1>
                                <a href="/shop">
                                    <button class="toShopLink_button waves-effect waves-light btn-large">Go to shop</button>
                                </a>
                            </div>
                        </div>`;
                    }
            });
        }
    });
}