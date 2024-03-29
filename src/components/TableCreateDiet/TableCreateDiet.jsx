import React, {useContext, useEffect, useState} from 'react'
import CreateIcon from "@material-ui/icons/Create";
import {
  Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Table,
  TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core'
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import {getProductsWithIngredients} from '../../http/productAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import ModalTableCreateDietProduct from '../ModalTableCreateDietProduct/ModalTableCreateDietProduct'
import {Context} from '../../index'
import {getUserOrder} from '../../http/orderAPI'
import {createOrderMealPlanProducts} from '../../http/mealPlanAPI'
import {useNavigate} from 'react-router-dom'
import Button from '../Button/Button'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  snackbar: {
    bottom: "104px",
  },
});


function TableCreateDiet() {
  const classes = useStyles();
  const {user} = useContext(Context);
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { day: "Понедельник", breakfast: {id: null, title: "", price: null}, launch: {id: null, title: "", price: null}, dinner: {id: null, title: "", price: null}, snack: {id: null, title: "", price: null} },
    { day: "Вторник", breakfast: {id: null, title: "", price: null}, launch: {id: null, title: "", price: null}, dinner: {id: null, title: "", price: null}, snack: {id: null, title: "", price: null} },
    { day: "Среда", breakfast: {id: null, title: "", price: null}, launch: {id: null, title: "", price: null}, dinner: {id: null, title: "", price: null}, snack: {id: null, title: "", price: null} },
    { day: "Четверг", breakfast: {id: null, title: "", price: null}, launch: {id: null, title: "", price: null}, dinner: {id: null, title: "", price: null}, snack: {id: null, title: "", price: null} },
    { day: "Пятница", breakfast: {id: null, title: "", price: null}, launch: {id: null, title: "", price: null}, dinner: {id: null, title: "", price: null}, snack: {id: null, title: "", price: null} },
    { day: "Суббота", breakfast: {id: null, title: "", price: null}, launch: {id: null, title: "", price: null}, dinner: {id: null, title: "", price: null}, snack: {id: null, title: "", price: null} },
    { day: "Воскресенье", breakfast: {id: null, title: "", price: null}, launch: {id: null, title: "", price: null}, dinner: {id: null, title: "", price: null}, snack: {id: null, title: "", price: null} },
  ]);

  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState({});
  const [isEdit, setEdit] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [mealPlanPrice, setMealPlanPrice] = useState(0);
  const [mealPlanPriceDone, setMealPlanPriceDone] = useState({});
  const [mealPlanItem, setMealPlanItem] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [finishMealPlan, setFinishMealPlan] = React.useState(false);

  useEffect(() => {
    getProductsWithIngredients().then(data => setProducts(data)).finally(() => setLoading(false))
  }, [])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleEdit = (i) => {
    setEdit(!isEdit);
  };

  const createMealPlanFunc = async () => {
    try {
      console.log(mealPlanItem)
      const userOrder = await getUserOrder(user.user.chatId);
      if (userOrder && finishMealPlan) {
        await createOrderMealPlanProducts({order_id: userOrder.id, meal_plan_id: userOrder.mealplan.id, products: mealPlanItem, price: mealPlanPriceDone.price});
        return navigate('/payment')
      }
      return alert('Ошибка, у тебя заполнены не все элементы в таблице!')
    } catch (e) {
      alert('Ошибка, что-то пошло не так')
    }
  }

  const handleSumProduct = (array) => {
    let price = {price: 0};
    let itemPrice = {breakfastPrice: 0, launchPrice: 0, dinnerPrice: 0, snackPrice: 0};
    array.forEach(i => {
      itemPrice.breakfastPrice = i['breakfast']['price'] ? i['breakfast']['price'] : 0
      itemPrice.launchPrice = i['launch']['price'] ? i['launch']['price'] : 0
      itemPrice.dinnerPrice = i['dinner']['price'] ? i['dinner']['price'] : 0
      itemPrice.snackPrice = i['snack']['price'] ? i['snack']['price'] : 0
      price['price'] = price['price'] + itemPrice.breakfastPrice + itemPrice.launchPrice + itemPrice.dinnerPrice + itemPrice.snackPrice
    })
    setMealPlanPrice(price.price)
  }

  const handleDone = () => {
    let problem = false;
    rows.forEach(i => {
      if (i['breakfast']['id'] === null || i['launch']['id'] === null | i['dinner']['id'] === null | i['snack']['id'] === null) problem = true
    })

    if (problem === false) {
      let mealPlan = {
        "Понедельник": [],
        "Вторник": [],
        "Среда": [],
        "Четверг": [],
        "Пятница": [],
        "Суббота": [],
        "Воскресенье": []
      };
      let days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];


      rows.forEach(item => {
        mealPlan[item.day].push({
          id: item['breakfast']['id'],
          title: item['breakfast']['title'],
          price: item['breakfast']['price']
        })
        mealPlan[item.day].push({
          id: item['launch']['id'],
          title: item['launch']['title'],
          price: item['launch']['price']
        })
        mealPlan[item.day].push({
          id: item['dinner']['id'],
          title: item['dinner']['title'],
          price: item['dinner']['price']
        })
        mealPlan[item.day].push({id: item['snack']['id'], title: item['snack']['title'], price: item['snack']['price']})
      })

      let price = {price: 0};
      for (let day of days) {
        let priceOneDay = mealPlan[day].reduce(function (previousValue, currentValue) {
          return {
            price: previousValue.price + currentValue.price,
          }
        });

        price['price'] = price['price'] + priceOneDay.price
      }
      mealPlan.price = price

      setMealPlanPriceDone(mealPlan['price']);
      delete mealPlan['price'];

      setMealPlanItem(mealPlan);
      setFinishMealPlan(true);
      return setShowConfirm(true);
    }
    return setOpenError(true)
  };

  const handleSave = () => {
    setEdit(!isEdit);
    setRows(rows);
    setOpen(true);
    handleSumProduct(rows)
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const item = products.find(x => x.id === Number(value));
    const list = [...rows];
    if (!item) {
      list[index][name]['id'] = null;
      list[index][name]['title'] = '';
      list[index][name]['price'] = null;
      return setRows(list);
    }
    list[index][name]['id'] = item.id;
    list[index][name]['title'] = item.title;
    list[index][name]['price'] = item.price;
    setRows(list);
  };

  const openInfoProduct = (id) => {
    if (id) {
      const item = products.find(x => x.id === Number(id));
      setModalProduct(item)
    } else {
      setModalProduct({})
    }
    setOpenModal(true)
  }

  const handleYes = async () => {
    await createMealPlanFunc()
  };

  const handleNo = () => {
    setShowConfirm(false);
  };

  if (loading) {
    return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p className={'text-gray-500 sm:text-xl dark:text-gray-400'}>Идет загрузка...</p>
    </div>
  }

  return (
    <TableBody>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Сохранено успешно!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        className={classes.snackbar}
      >
        <Alert onClose={handleCloseError} severity="error">
          Вы не заполнили всю таблицу с рационом питания!
        </Alert>
      </Snackbar>
      <ModalTableCreateDietProduct open={openModal} product={modalProduct} onClose={() => setOpenModal(false)}/>
      <Box margin={1}>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div>
            {isEdit ? (
              <div className={'flex item-center gap-2 p-2'}>
                {rows.length !== 0 && (
                  <>
                    <button onClick={handleSave}>
                      <label className={'flex item-center gap-1 p-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'}>
                      <DoneIcon />
                        Сохранить
                      </label>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className={'flex item-center gap-2 p-2'}>
                <button onClick={handleEdit}>
                  <label className={'flex item-center gap-1 p-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'}>
                  <CreateIcon />
                    Редактировать
                  </label>
                </button>
                <button onClick={handleDone}>
                  <label className={'flex item-center gap-1 p-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'}>
                    <DoneIcon />
                    Создать
                  </label>
                </button>
              </div>
            )}
          </div>
        </div>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell><p className={'text-sm font-medium text-white'}>День</p></TableCell>
              <TableCell><p className={'text-sm font-medium text-white'}>Завтрак</p></TableCell>
              <TableCell><p className={'text-sm font-medium text-white'}>Обед</p></TableCell>
              <TableCell><p className={'text-sm font-medium text-white'}>Ужин</p></TableCell>
              <TableCell><p className={'text-sm font-medium text-white'}>Перекус</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                  <TableRow>
                    {isEdit ? (
                      <>
                        <TableCell scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.day}</p>
                        </TableCell>
                        <TableCell scope="row">
                          <div className={'flex item-center gap-1'}>
                            <select
                              name="breakfast"
                              onChange={(e) => handleInputChange(e, i)}
                            >
                              <option value={null} selected="">Выберете продукт:</option>
                              {products.map((item) => {
                                return <option selected={row.breakfast.id === item.id ? true : false} key={item.id} value={item.id}>{item.title} | {item.type.title} | {item.price}р</option>
                              })}
                            </select>
                            <button type={"button"}
                                    onClick={() => openInfoProduct(row.breakfast.id)}
                                    className="inline-flex items-center p-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                              <FontAwesomeIcon icon={faBookOpen}/>
                            </button>
                          </div>
                        </TableCell>
                        <TableCell scope="row">
                          <div className={'flex item-center gap-1'}>
                            <select
                              name="launch"
                              onChange={(e) => handleInputChange(e, i)}
                            >
                              <option value={null} selected="">Выберете продукт:</option>
                              {products.map((item) => {
                                return <option selected={row.launch.id === item.id ? true : false} key={item.id} value={item.id}>{item.title} | {item.type.title} | {item.price}р</option>
                              })}
                            </select>
                            <button type={"button"}
                                    onClick={() => openInfoProduct(row.launch.id)}
                                    className="inline-flex items-center p-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                              <FontAwesomeIcon icon={faBookOpen}/>
                            </button>
                          </div>
                        </TableCell>
                        <TableCell scope="row">
                          <div className={'flex item-center gap-1'}>
                            <select
                              name="dinner"
                              onChange={(e) => handleInputChange(e, i)}
                            >
                              <option value={null} selected="">Выберете продукт:</option>
                              {products.map((item) => {
                                return <option selected={row.dinner.id === item.id ? true : false} key={item.id} value={item.id}>{item.title} | {item.type.title} | {item.price}р</option>
                              })}
                            </select>
                            <button type={"button"}
                                    onClick={() => openInfoProduct(row.dinner.id)}
                                    className="inline-flex items-center p-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                              <FontAwesomeIcon icon={faBookOpen}/>
                            </button>
                          </div>
                        </TableCell>
                        <TableCell scope="row">
                          <div className={'flex item-center gap-1'}>
                            <select
                              name="snack"
                              onChange={(e) => handleInputChange(e, i)}
                            >
                              <option value={null} selected="">Выберете продукт:</option>
                              {products.map((item) => {
                                return <option selected={row.snack.id === item.id ? true : false} key={item.id} value={item.id}>{item.title} | {item.type.title} | {item.price}р</option>
                              })}
                            </select>
                            <button type={"button"}
                                    onClick={() => openInfoProduct(row.snack.id)}
                                    className="inline-flex items-center p-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                              <FontAwesomeIcon icon={faBookOpen}/>
                            </button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.day}</p>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.breakfast.id ? row.breakfast.title : 'Нет'}</p>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.launch.id ? row.launch.title : 'Нет'}</p>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.dinner.id ? row.dinner.title : 'Нет'}</p>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.snack.id ? row.snack.title : 'Нет'}</p>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className={'block p-3'}>
          <p className={'text-sm font-medium text-white'}>Общая цена: {mealPlanPrice}р</p>
        </div>
        {showConfirm && (
          <div>
            <Dialog
              open={showConfirm}
              onClose={handleNo}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Подтверждение формирования рациона питания"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Вы уверены, что вы правильно собрали рацион питания для себя?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleYes}
                  color="primary"
                  autoFocus
                >
                  Да
                </Button>
                <Button
                  onClick={handleNo}
                  color="primary"
                  autoFocus
                >
                  Нет
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </Box>
    </TableBody>
  );
}

export default TableCreateDiet;
