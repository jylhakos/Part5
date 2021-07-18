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
})