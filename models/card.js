const mongoose = require('mongoose');
const { checkLink } = require('../validators/checkLink');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: checkLink,
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);

// name — имя карточки, строка от 2 до 30 символов, обязательное поле;
// link — ссылка на картинку, строка, обязательно поле;
// owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
// likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default).
// createdAt — дата создания, тип Date, значение по умолчанию Date.now.
