document.addEventListener('DOMContentLoaded', () => {
    const USERS_API = 'https://jsonplaceholder.typicode.com/users';
    const AUTH_API = './auth.json';
    const DASHBOARD = document.querySelector('.dashboard');
    const AUTH = document.querySelector('.auth');
    const AUTH_MESSAGE = document.querySelector('.auth__message');
    let auth_data = null;

    function getUsersData(url) {
        fetch(url)
            .then(response => response.json())
            .then(users => {
                users.forEach(user => renderUsers(user));
            })
            .catch(error => {
                const CONTAINER = document.querySelector('.dashboard .container')
                const MESSAGE = document.createElement('div');
                MESSAGE.classList.add('alert', 'alert-danger');
                MESSAGE.setAttribute('role', 'alert');
                MESSAGE.textContent = 'Something went wrong, please contact our support'
                CONTAINER.appendChild(MESSAGE);
                console.error(error);
            });
    }
    function renderUsers(user) {
        const USERS_LIST = document.querySelector('.users');
        const USER = document.createElement('li');
        USER.classList.add('card', 'users__item');
        USER.innerHTML = `
                <div class="card-header">
                    <i class="fa-solid fa-circle-user"></i>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <span class="card-text"><i class="fa-solid fa-building"></i> ${user.company.name}</span>
                    <ul class="users__contacts">
                        <li>
                            <a href="mailto:${user.email}" class="btn btn-outline-primary" aria-label="Email">
                                <i class="fa-solid fa-envelope"></i>
                            </a>
                        </li>
                        <li>
                            <a href="http://${user.website}" class="btn btn-outline-primary" aria-label="Website" target="_blank">
                                <i class="fa-solid fa-link"></i>
                            </a>
                        </li>
                    </ul>
                </div>
        `;
        USERS_LIST.appendChild(USER);
    }
    function getAuthData(url) {
        fetch(url)
        .then(response => response.json())
        .then(authorizations => {
            auth_data = authorizations.auth;
        })
        .catch(error => {
            console.error(error);
        });
    }

    const LOGIN = document.querySelector('.auth__btn');
    LOGIN.addEventListener('click', (event) => {
        event.preventDefault();
        const EMAIL_INPUT =  document.getElementById('email');
        const PASSWORD_INPUT =  document.getElementById('password');
        auth_data.forEach((authorization) => {
            if (authorization.email !== EMAIL_INPUT.value || authorization.password !== PASSWORD_INPUT.value) {
                AUTH_MESSAGE.style.display = 'flex';
            }
            else {
                AUTH.style.display = 'none';
                DASHBOARD.style.display = 'flex';
            }
        });
    });
    const LOGOUT = document.querySelector('.dashboard__logout');
    LOGOUT.addEventListener('click', (event) => {
        event.preventDefault();
        AUTH_MESSAGE.style.display = 'none';
        AUTH.style.display = 'flex';
        DASHBOARD.style.display = 'none';
    });
    getAuthData(AUTH_API);
    getUsersData(USERS_API);
});