const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; 

const AutoDM = () => {
  var stream = T.stream('statuses/filter', { track: '@IdeaOriginalEs' });
  console.log(stream);
  console.log("Empezamos a enviar mensajitos 🚀🚀🚀");
  stream.on("favorite", SendMessage);
};

const SendMessage = user => {
  console.log("1");
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };

  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉 Nuevo seguidor 🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message enviado correctamente a ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {

  return `Hola ${name} Gracias por seguirme, jeje esto es una prueba\n 😊😊 `;
  
};

module.exports = AutoDM;
