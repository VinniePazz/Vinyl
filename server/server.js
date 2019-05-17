const express = require("express");
const path = require("path");
const async = require("async");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Models ================================================
const { User } = require("./models/user");
const { Genre } = require("./models/genre");
const { Product } = require("./models/product");
const { Payment } = require("./models/payment");

// Middlewares ===================================================
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

//NodeMailer will be here

//=================================================================
//             PRODUCTS
//=================================================================

app.post("/api/product/shop", (req, res) => {
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let order = req.body.order ? req.body.order : "desc";
  let limit = req.body.limit ? parseInt(req.body.limit) : 25;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .populate("genre")
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit)
    .exec((error, articles) => {
      if (error) return res.status(400).send(error);
      res.status(200).json({
        size: articles.length,
        articles
      });
    });
});

// BY ARRIVAL // QUERY STRING PARAMETRES
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=10

app.get("/api/product/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  Product.find()
    .populate("genre")
    .sort({ [sortBy]: order })
    .limit(limit)
    .exec((error, articles) => {
      if (error) return res.status(400).send(error);
      res.send(articles);
    });
});

/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single

app.get("/api/product/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate("genre")
    .exec((error, docs) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send(docs);
    });
});

app.post("/api/product/article", auth, admin, async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(200).json({
      success: true,
      article: doc
    });
  } catch (error) {
		res.json({ success: false, error });
		console.log(error)
  }
});

//=================================
//              GENRE
//=================================

app.post("/api/product/genre", auth, admin, (req, res) => {
  const genre = new Genre(req.body);

  genre.save((error, doc) => {
    if (error) return res.json({ success: false, error });
    res.status(200).json({
      success: true,
      genre: doc
    });
  });
});

app.get("/api/product/genres", (req, res) => {
  Genre.find({}, (error, genres) => {
    if (error) return res.status(400).send(error);
    res.status(200).send(genres);
  });
});

//=================================
//              USERS
//=================================

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((error, doc) => {
		if (error) return res.json({ success: false, error });
    user.generateToken((error, user) => {
      if (error) return res.status(400).send(error);
      res
        .cookie("w_auth", user.token)
        .status(200)
        .json({
					success: true,
					user: doc
        });
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
        wrong: "email"
      });

    user.comparePassword(req.body.password, (error, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong password",
          wrong: "password"
        });

      user.generateToken((error, user) => {
        if (error) return res.status(400).send(error);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (error, doc) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).send({
      success: true
    });
  });
});

app.post("/api/users/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

app.get("/api/users/removeimage", auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ succes: false, error });
    res.status(200).send("ok");
  });
});

app.post("/api/users/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach(item => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query.id) } } },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id);
      });

      Product.find({ _id: { $in: array } })
        .populate("genre")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          });
        });
    }
  );
});

app.post("/api/users/purchase", auth, (req, res) => {
  let history = [];
  let paymentData = {};

  // user history
  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: Date.now(),
      author: item.author,
      album: item.album,
      genre: item.genre.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: `PAY-${Date.now()}` //dummy payment id
    });
  });

  // PAYMENTS DASH
  paymentData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  };
  paymentData.metaData = {
    paymentId: `PAY-${Date.now()}`,
    dateOfPurchase: Date.now()
  };
  paymentData.buyingProduct = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (error, user) => {
      if (error) return res.json({ success: false, error });

      const payment = new Payment(paymentData);

      payment.save((error, doc) => {
        if (error) return res.json({ success: false, error });

        let products = [];

        doc.buyingProduct.forEach(item => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity
                }
              },
              { new: false },
              callback
            );
          },
          error => {
            if (error) return res.json({ success: false, error });
            res.status(200).json({
              successPurchase: true,
              cart: user.cart,
							cartDetail: [],
							history: user.history
            });
          }
        );
      });
    }
  );
});

app.post("/api/users/update_profile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body
    },
    { new: true },
    (error, doc) => {
      if (error) return res.json({ success: false, error });
      return res.status(200).send({
        userData: {
          isAdmin: doc.role === 0 ? false : true,
          isAuth: true,
          email: doc.email,
          name: doc.name,
          lastname: doc.lastname,
          role: doc.role,
          cart: doc.cart,
          history: doc.history
        },
        success: true
      });
    }
  );
});
/////////////////////////  BOTTOM  //////////////////////////////

// HEROKU
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// ERROR ROUTE MUST BE HERE!!!

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
