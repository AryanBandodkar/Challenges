import express from 'express';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { name: 'Aryan' });
});

export function solve_18_static_files_template_engines() {
  return {
    app,
    static: true,
    viewEngine: 'ejs',
  };
}