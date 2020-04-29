const app = require('../server');
const supertest = require('supertest')


const request = supertest(app)


//TEST PARA GET POST
describe('No login', function () {
  it('Get de todos los post', async (done) => {
    const { body } = await request.get('/post')
        .expect('Content-type', /json/)
        .expect(200)
    console.log(body)
    expect(body[0].username).toBeTruthy();
    expect(body[0].nickname).toBeTruthy();
    expect(body[0].text).toBeTruthy();
    done();
  });

  //intentar crear un post sin estar registrado
  it('Crear post sin login', async (done) => {
    var newPost = {
        username: 'peppe',
        title: 'Learn About Something',
        text: 'Lets learn guys. Im going to explain you how.',
    };

    const { body } = await request.post('/post')
        .send(newPost)
        .expect(401)
    done();

  });

});

describe('Test de post', function () {

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
//comprobamos que el token se ha generado ok
  it('if token has been generated', () => {
      expect(token).toBeTruthy();
      expect(token).not.toBeUndefined();
      expect(typeof token).toBe('string');
  });

  //CREAR POST CON AUTH
  it('when create new POST then this post can be obtained', async (done) => {
    var newPost = {
        username: 'peppe',
        nickname: 'pep',
        title: 'Aprendiendo a hacer test',
        text: 'Que divertido es aprender a ha hacer testing'
    };
    //se crea el nuevo post 
    const addPost = await request.post('/post')
        .send(newPost)
        .set('Authorization', 'bearer ' + token)
        .expect('Content-type', /json/)
        .expect(201)
    //Se coge el id del post que se ha creado 
    const lastPostId = addPost.body._id

    //se comprueba que ese post con ese id esta en db y que además coincide con los datos 
    const getNewPost = await request.get('/post/' + lastPostId)
        .set("Accept", "text/plain")
        .expect('Content-type', /json/)
        .expect(200)
    console.log(getNewPost.body)
    expect(getNewPost.body.username).toEqual('peppe');
    expect(getNewPost.body.nickname).toEqual('pep');

    done();
  });
  //GET POST POR ID SIN AUTH
  it('get the post by ID', async (done)=>{
    const allPost = await request.get('/post');
    const lastPostId = allPost.body[allPost.body.length - 1]._id
    const postGetId = await request.get('/post/' + lastPostId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      done();    
  });

  //PUT DE UN POST CON AUTH
  test('when update a POST then is effectively updated', async (done) => {
    const allPost = await request.get('/post');
    const lastPostId = allPost.body[allPost.body.length - 1]._id
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
    done();

});

  //DELETE POST SON AUTH
  it('when delete ad then is effectively deleted', async () => {
    const allPost = await request.get('/post');
    //para borrar el último post, hago la petición de de todos los post, despues cojo el id del último que es el último que se ha creado con el test anterior, así lo borro y no se queda el de prueba en la db
    const lastPostId = allPost.body[allPost.body.length - 1]._id
    //borro el post y me tiene que dar respuesta 200ok
    const postdeleted = await request.delete('/post/'+ lastPostId)
          .set('Authorization', 'bearer ' + token)
          .expect('Content-type', /json/)
          .expect(200)
    console.log(postdeleted.body)
    //compruebo que está borrado 
      await request.get('/post/'+ lastPostId)
           .expect(404)
  })
});

  