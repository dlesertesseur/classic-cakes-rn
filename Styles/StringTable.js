export const stringTable = {
  APP_TITLE: "Classic Cakes",
  NO_DATA: "SIN DATOS",
  BT_CONFIRM: "CONFIRMAR",
  BT_CANCEL: "CANCELAR",
  BT_ACCEPT: "ACEPTAR",
  BT_REMOVE: "ELIMINAR",
  BT_CLOSE: "CERRAR",
  BT_SELECT: "SELECCIONAR",
  BT_LOGIN: "Login",
  BT_LOGOUT: "Logout",
  BT_SIGNUP_NEW_USER: "Registrar nuevo usuario",
  BT_ALREADY_HAVE_USER: "Ya esta registrado?",
  BT_SIGNUP: "Registrar",
  BT_BACK_TO_LOGIN: "Volver a Login",
  BT_TAKE_PHOTO:"Tomar una foto",
  BT_LOCATION: "Obtener ubicacion",
  BT_GALLERY: "Galeria",
  BT_MAP: "Definir ubicacion",
  LB_TOTAL: "Total: ",
  LB_MONEY_SIGN: "$",
  LB_ORDER_DATE: "Fecha: ",
  LB_ADD_PRODUCT: "ADD PRODUCT",
  LB_EMAIL: "Email",
  LB_PASSWORD: "Password",
  LB_CONFIRM_PASSWORD: "Confirmar Password",
  LB_ADDRESS: "Direccion",
  LB_SUB_TOTAL: "Subtotal: $",
  LB_UNIT_PRICE: "Precio por uni. $",
  LB_DELIVERY_ADDRESS: "Direccion: ",

  SCREEN_ORDERS: "Ordenes",
  SCREEN_CART: "Carrito",
  SCREEN_SHOP: "Productos",
  SCREEN_CATEGORIES: "Categorias",
  SCREEN_LOCATIONS: "Direcciones de entrega",
  SCREEN_NEW_LOCATIONS: "Nueva direccion",
  SCREEN_GET_LOCATION: "Obtener direccion",
  SCREEN_SET_LOCATION: "Definir direccion",
  SCREEN_ORDER_DETAIL: "Detalle de orden",
  REMOVE_PRODUCT_TITLE: "Eliminar Producto",
  REMOVE_PRODUCT_TEXT: "Esta seguro de eliminar el producto?",
  REMOVE_ADDRESS_TEXT: "Esta seguro de eliminar la direccion?",
  CONFIRM_PURCHASE_TEXT: "Esta seguro de generar la orden?",
  PURCHASE_CONFIRMED_TEXT: "La orden se creo correctamente",
  PURCHASE_CONFIRMED_TEXT_ID: "ID: ",
  PURCHASE_ERROR_TEXT: "Error al crear la orden",
  SIGNUP_ERROR: "Error al registrar el usuario",
  LOGIN_ERROR: "Error en el login de usuario",
  LOCATION_ERROR: "Error al insertar una direccion",
  CONFIRM_PASSWORD_ERROR: "Las claves no son iguales",
  MANDATORY_FIELD: "Campo obligatorio"
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