import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;500;600;700;800&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing:border-box;
        list-style:none;
    }
    :root{
        --primary-color:#222260;
        --primary-color2:'color:rgba(34,34,96,.6)';
        --primary-color3:'color:rgba(34,34,96,.4)';
        --color-green: #219653;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
    }
    body{
        font-family:'Inter', sans-serif;
        font-size: clamp(1rem,1.5vw,1.2rem);
        overflow:hidden;
        color:rgba(34,34,96,.6);
    }
    
    h1,h2,h3,h4,h5,h6{
        font-family: 'Outfit', sans-serif;
        color: var(--primary-color);
        letter-spacing: -0.5px;
    }

    button {
        font-family: 'Outfit', sans-serif;
    }
    
    @keyframes appear {
        0% {
            opacity: 0;
            transform: translateY(15px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{ transform: translateX(0); }
            25%{ transform: translateX(10px); }
            50%{ transform: translateX(-10px); }
            75%{ transform: translateX(10px); }
            100%{ transform: translateX(0); }
        }
    }
`;