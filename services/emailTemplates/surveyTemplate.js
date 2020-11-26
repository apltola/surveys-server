const config = require('../../config');

module.exports = (survey) => {
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <style>
        body {
          margin: 0;
          font-family: Avenir, Helvetica, Arial, sans-serif;
        }
        .container {
          min-height: 100vh;
          position: relative;
          background-color: #f7f7f7;
        }
        .content {
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          max-width: 600px;
          margin: 3vh auto;
          padding: 2vh 3vw;
          background-color: white;
          text-align: center;
        }
        .email-body {
          padding-top: 1vh;
          font-size: 20px;
          white-space: pre;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        a:active {
          color: inherit;
        }
        button {
          cursor: pointer;
          padding: 8px 16px;
          box-shadow: none;
          background: transparent;
          border: 1px solid rgba(27, 31, 35, 0.15);
          border-radius: 5px;
          margin: 5px 10px;
          font-size: 16px;
          font-weight: 500;
          box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px 0px,
            rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
        }
        .btn-text {
          margin-right: 6px;
        }
        .small-print {
          font-size: 12px;
          border-top: 1px solid rgb(226, 232, 240);
          margin-top: 30px;
          padding-top: 8px;
          opacity: 0.5;
        }
        .small-print-bottom {
          font-size: 12px;
          padding-top: 8px;
          opacity: 0.5;
        }
      </style>
      <body>
        <div class="container">
          <div class="content">
            <p class="email-body">${survey.body}</p>
            <button>
              <a href='${config.clientOrigin}/surveys/${survey.id}/feedback'>
                Yes
              </a>
            </button>
            <button>
              <a href='${config.clientOrigin}/surveys/${survey.id}/feedback'>
                No
              </a>
            </button>
            <p class="small-print">
              You received this email from <a href="https://yesnosurveys.vercel.app">yesnosurveys.vercel.app</a>
            </p>
            <div class="small-print-bottom">
              You cannot respond to this email.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
