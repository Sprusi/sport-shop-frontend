/* eslint-disable i18n/no-russian-character */

export const SUMM = 'Сумма';
export const QUANTITY = 'Количество';
export const YES = 'Да';
export const NO = 'Нет';

/**
 *  AXIOS
 */
export const NO_CONNECTION_TO_SERVER = 'Нет связи с сервером';
export const ACCESS_DENIED = 'Доступ запрещен';
export const LOGIN_ERROR = 'Ошибка входа в систему';
export const SERVER_REQUEST_ERROR = 'Ошибка в запросе к серверу';
export const REQUEST_ERROR = 'Ошибка в запросе';
export const PAGE_NOT_FOUND = 'Страница или документ не найдена';
export const INACTIVE_SESSION = 'Сессия истекла или неактивна';
export const INTERNAL_SERVER_ERROR = 'Ошибка на стороне сервера';
export const ERROR = (key: string) => 'Ошибка ' + key;
export const SOMETHING_WENT_WRONG = 'Что-то пошло не так ...';
// Main page

export const MAIN_PAGE_TITLE_FIRST = 'Здоровое питание на каждый день ';
export const MAIN_PAGE_TITLE_SECOND = 'для похудения, поддержания ';
export const MAIN_PAGE_TITLE_THERD = 'или набора веса с доставкой на дом';
export const MAIN_PAGE_CATALOG = 'Каталог';
export const MAIN_PAGE_ORDERS = 'Заказы';

//UserHealthyEating

export const HEALTHY_EATING_FOR_YOU = 'Предложение для вас';
export const HEALTHY_EATING_CALORIES = 'Калории';
export const HEALTHY_EATING_CARBOHYDRATES = 'Углеводы';
export const HEALTHY_EATING_FATS = 'Жиры';
export const HEALTHY_EATING_SQUIRRELS = 'Белки';
export const HEALTHY_EATING_COMPOUND = 'Состав';
export const HEALTHY_EATING_PRICE = 'Цена';

//AdminHealthyEating

export const ADMIN_HEALTHY_EATING_TITLE = 'Список продуктов';

export const ADMIN_HEALTHY_KCAL_SHORT = 'кКал';
export const ADMIN_HEALTHY_RUB = 'руб';
export const ADMIN_HEALTHY_GRAM_SHORT = 'г';

export const ADMIN_HEALTHY_EATING_TABLE_COLUMNS = {
  id: 'Действия',
  title: 'Название',
  compound: 'Состав',
  kcal: 'Калории',
  squirrels: 'Белки',
  fats: 'Жиры',
  carbohydrates: 'Углеводы',
  price: 'Цена',
  image: 'Изображение',
  eatingType: 'Время приема',
};

//Basket

export const BASKET = 'Корзина';
export const BASKET_ORDER_BUTTON = 'Оформить заказ';

//Order history
export const ORDER_HISTORY = 'История заказов';
export const ORDER_HISTORY_NUMBER = 'Номер заказа';
export const ORDER_HISTORY_FILTERS = {
  userId: 'ID пользователя',
  basketId: 'Номер заказа',
  price: 'Сумма заказа',
  isActive: 'Активен?',
  updatedDate: 'Дата обновления',
};
export const ORDER_HISTORY_ADD_TO_WORK = 'Принять в работу';
