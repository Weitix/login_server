const express = require("express");
const router = express.Router();

// mongodb user model
const User = require("./../models/User");

// Password handler
const bcrypt = require("bcrypt");

// Signup
router.post("/signup", (req, res) => {
  let { name, email, password, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (name == "" || email == "" || password == "" || dateOfBirth == "") {
    res.json({
      status: "ошибка",
      message: "Пустые поля ввода!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "ошибка",
      message: "Введено неверное имя",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "ошибка",
      message: "Введенный неверный адрес электронной почты",
    });
  }  else if (password.length < 8) {
    res.json({
      status: "ошибка",
      message: "Пароль слишком короткий!",
    });
  } else {
    // Checking if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          // A user already exists
          res.json({
            status: "ошибка",
            message: "Пользователь с предоставленным электронным адресом уже существует",
          });
        } else {
          // Try to create new user

          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth,
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "успех",
                    message: "Регистрация прошла успешно",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "ошибка",
                    message: "Произошла ошибка при сохранении учетной записи пользователя!",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "ошибка",
                message: "Произошла ошибка при хэшировании пароля!",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "ошибка",
          message: "Произошла ошибка при проверке существующего пользователя!",
        });
      });
  }
});

// Signin
router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "ошибка",
      message: "Предоставленные пустые учетные данные",
    });
  } else {
    // Check if user exist
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // User exists

          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: "успех",
                  message: "Успешная регистрация",
                  data: data,
                });
              } else {
                res.json({
                  status: "ошибка",
                  message: "Введен неверный пароль!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "ошибка",
                message: "При сравнении паролей произошла ошибка",
              });
            });
        } else {
          res.json({
            status: "ошибка",
            message: "Введенные неверные учетные данные!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "ошибка",
          message: "Произошла ошибка при проверке существующего пользователя",
        });
      });
  }
});

module.exports = router;

