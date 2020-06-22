
const app = require('../server');
const supertest = require('supertest');

const request = supertest(app)

//TEST PARA GET POST
describe('get all post' , function () {
  it('Get de todos los post', async (done) => {
    const { body } = await request.get('/post')
        .expect('Content-type', /json/)
        .expect(200)
    expect(body[0].username).toBeTruthy();
    expect(body[0].nickname).toBeTruthy();
    expect(body[0].text).toBeTruthy();
    done();
  });

  //intentar crear un post sin estar registrado
  it('try to create a post without', async (done) => {
    const newPost = {
        username: 'peppe',
        title: 'Aprendiendo algo nuevo',
        text: 'Vamos a aprender a hacer Super test paso a paso',
    };

    const { body } = await request.post('/post')
        .send(newPost)
        .expect(401)
    done();

  });

});

describe('Test de post with auth', function () {

  let token = null;
  //hacemos el login para conseguir el token
  beforeEach((done) => {
      request
          .post('/login')
          .auth('pepe', '1234')
          .end(function (err, res) {
              token = res.body.token;
              done();
          });
  });

  //CREAR POST CON AUTH
  it('CRUD', async (done) => { 

  //comprobamos que el token se ha generado ok
  expect(token).toBeTruthy();
  expect(token).not.toBeUndefined();
  expect(typeof token).toBe('string');

  const newPost = {
        username: 'peppe',
        nickname: 'pep',
        title: 'Aprendiendo a hacer test',
        text: 'Que divertido es aprender a ha hacer testing'}
    //se crea el nuevo post 
    const addPost = await request.post('/post')
        .send(newPost)
        .set('Authorization', 'bearer ' + token)
        .expect('Content-type', /json/)
        .expect(201)
    
    const lastPostId = addPost.body._id

    //se comprueba que ese post con ese id esta en db y que además coincide con los datos 
    const getNewPost = await request.get('/post/' + lastPostId)
        .set("Accept", "text/plain")
        .expect('Content-type', /json/)
        .expect(200)
    expect(getNewPost.body.username).toEqual('peppe');
    expect(getNewPost.body.nickname).toEqual('pep');


  //GET POST POR ID SIN AUTH
    const allPost = await request.get('/post');
    const lastPostIds = allPost.body[allPost.body.length - 1]._id
    const postGetId = await request.get('/post/' + lastPostIds)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    

  //PUT DE UN POST CON AUTH
    const updatedPost = { 
      title: 'Aprendiendo a hacer test actualizaco',
      text: 'Que divertido es aprender a ha hacer testing contenido actualizado' 
    };
    await request.put('/post/' +lastPostId)
        .send(updatedPost)
        .set('Authorization', 'bearer ' + token)
        .expect('Content-type', /json/)
        .expect(200)

    const updateOldPOst = await request.get('/post/' +lastPostId)
        .expect('Content-type', /json/)
        .expect(200)
    expect(updateOldPOst.body.title).toEqual(updatedPost.title);
    expect(updateOldPOst.body.content).toEqual(updatedPost.content);


  //DELETE POST SON AUTH
    const postdeleted = await request.delete('/post/'+ lastPostId)
          .set('Authorization', 'bearer ' + token)
          .expect('Content-type', /json/)
          .expect(200)
    
      await request.get('/post/'+ lastPostId)
           .expect(404)
    
    done();
  });


});

  