export const AppConfig = {
    // Configurações do app
    APP_NAME: 'Washoku House',
    APP_ICON: '🍣',
    
    // Cores do tema
    COLORS: {
      PRIMARY: '#D90429',
      SECONDARY: 'darkgreen',
      BACKGROUND: '#111',
      CARD_BACKGROUND: '#222',
      TEXT_PRIMARY: 'white',
      TEXT_SECONDARY: 'gray',
      TEXT_ACCENT: 'lightblue',
      BORDER: 'lightgray',
      SUCCESS: 'green',
      ERROR: '#D90429'
    },
    
    // Validações
    VALIDATION: {
      MIN_USERNAME_LENGTH: 3,
      MIN_PASSWORD_LENGTH: 3
    },
    
    // Mensagens
    MESSAGES: {
      LOGIN_SUCCESS: 'Login realizado com sucesso!',
      LOGIN_ERROR: 'Usuário ou senha incorretos',
      REGISTER_SUCCESS: 'Usuário cadastrado com sucesso!',
      REGISTER_ERROR_USER_EXISTS: 'Este nome de usuário já está em uso',
      REGISTER_ERROR_PASSWORD_MISMATCH: 'As senhas não coincidem',
      FILL_ALL_FIELDS: 'Por favor, preencha todos os campos',
      ITEM_ADDED_TO_CART: 'foi adicionado ao carrinho',
      LOADING_MENU: 'Carregando cardápio...',
      MENU_LOAD_ERROR: 'Não foi possível carregar o cardápio'
    }
  };