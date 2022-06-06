export const stringTable = {
  APP_TITLE: "Classic Cakes",
  NO_DATA: "SIN DATOS",
  BT_CONFIRM: "Confirmar",
  BT_CANCEL: "CANCELAR",
  BT_ACCEPT: "ACEPTAR",
  BT_REMOVE: "ELIMINAR",
  BT_CLOSE: "CERRAR",
  BT_LOGIN: "Login",
  BT_LOGOUT: "Logout",
  BT_SIGNUP_NEW_USER: "Registrar nuevo usuario",
  BT_SIGNUP: "Registrar",
  BT_BACK_TO_LOGIN: "Volver a Login",
  LB_TOTAL: "Total: ",
  LB_MONEY_SIGN: "$",
  LB_ORDER_DATE: "Fecha: ",
  LB_ADD_PRODUCT: "ADD PRODUCT",
  LB_EMAIL: "Email",
  LB_PASSWORD: "Password",
  LB_CONFIRM_PASSWORD: "Confirmar Password",
  SCREEN_ORDERS: "Ordenes",
  SCREEN_CART: "Carrito",
  SCREEN_SHOP: "Productos",
  SCREEN_CATEGORIES: "Categorias",
  REMOVE_PRODUCT_TITLE: "Eliminar Producto",
  REMOVE_PRODUCT_TEXT: "Esta seguro de eliminar el producto?",
  CONFIRM_PURCHASE_TEXT: "Esta seguro de generar la orden?",
  PURCHASE_CONFIRMED_TEXT: "La orden se creo correctamente",
  SIGNUP_ERROR: "Error al registrar el usuario",
  LOGIN_ERROR: "Error en el login de usuario",
  CONFIRM_PASSWORD_ERROR: "Las claves no son iguales",
};

export function getErrorMessage(code) {
  let ret = "";

  switch (code) {
    case "EMAIL_NOT_FOUND":
      ret = "Usuario no encontrado";
      break;

    case "INVALID_PASSWORD":
      ret = "Clave invalida";
      break;

    case "EMAIL_EXISTS":
      ret = "El usuario ya existe";
      break;

    default:
      console.log("getErrorMessage(" + code + ") message not declared");
  }

  return ret;
}