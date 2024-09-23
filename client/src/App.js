import { Routes, Route } from "react-router-dom";
import {
  Home,
  Homepage,
  Login,
  Rental,
  DetailPost,
  SearchDetail,
  Contact,
  Like,
} from "./containers/Public";
import { path } from "./ultils/constant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import {
  System,
  CreatePost,
  ManagePost,
  EditAccount,
  ManageUser,
  ManageCategory,
  ManagePostUser,
  ManageContact,
} from "./containers/System";
import * as actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);
  return (
    <div className=" bg-primary overflow-hidden">
      <ToastContainer />
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<Homepage />} />
          <Route path={path.HOME__PAGE} element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.NHA_TRO_THUE} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.SAVE_NEW} element={<Like />} />
          <Route
            path={path.DETAIL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.DETAIL_ALL} element={<DetailPost />} />

          <Route
            path={path.DETAIL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_CATEGORY} element={<ManageCategory />} />
          <Route path={path.MANAGE_POST_USER} element={<ManagePostUser />} />
          <Route path={path.MANAGE_CONTACT} element={<ManageContact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
