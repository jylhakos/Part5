describe('Blog app', function() {
  beforeEach(function() {
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  // 5.17
  it('Login form is shown', function() {
    console.log('Login form is shown')
  })

  // 5.18
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('mluukkai')
      cy.get('input[name="Password"]').type('secret')
      cy.get('button').contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('mluukkai')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('button').contains('login').click()
      cy.contains('Matti Luukkainen logged in').should('not.exist')
    })
  })

  // 5.19
  describe('When logged in', function() {
    beforeEach(function() {
        cy.get('input[name="Username"]').type('mluukkai')
        cy.get('input[name="Password"]').type('secret')
        cy.get('button').contains('login').click()
      })

    it('A blog can be created', function() {
      cy.contains('Create New Blogs').click()
      cy.get('input[name="title"]').type('First class tests')
      cy.get('input[name="author"]').type('Robert C. Martin')
      cy.get('input[name="url"]').type('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
      cy.get('button[name="create"]').click()
      cy.contains('First class tests')
    })
  })
})