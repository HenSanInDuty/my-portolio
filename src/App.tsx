import { RouterProvider } from "react-router-dom";
import style from "./App.module.css";
import { router } from "./routes";

const App = () => {
  return (
    <>
      <div className={style.header}>CAM EVEL</div>
      <div className={style.mainContent}>
        <RouterProvider router={router}></RouterProvider>
      </div>
      <div className={style.footer}></div>
    </>
  );
};

export default App;
