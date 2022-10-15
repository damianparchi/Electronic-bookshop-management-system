import React from "react";
import "../Register/Register.css";
import img from "../../tloregister.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("Imie użytkownika jest wymagane!"),
  lastName: yup.string().required("Nazwisko użytkownika jest wymagane!"),
  email: yup
    .string()
    .email("Email musi być poprawny!")
    .required("Email użytkownika jest wymagany!"),
  password: yup
    .string()
    .min(5, "Hasło może składać się z minimum 5 znaków!")
    .max(15, "Hasło może składać się z maksimum 15 znaków!")
    .required("Hasło jest wymagane!"),
  confirmPwd: yup.string().oneOf([yup.ref("password"), null]),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <section className="cont">
      <div className="register">
        <div className="col-1">
          <h2>Rejestracja</h2>
          <span>Zarejestruj swoje konto i ciesz się usługą!</span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            id="form"
            className="flex flex-col"
          >
            <input
              type="text"
              name="firstName"
              placeholder="Imie..."
              {...register("firstName")}
            />
            {errors.firstName?.message}
            <input
              type="text"
              name="lastName"
              placeholder="Nazwisko..."
              {...register("lastName")}
            />
            {errors.lastName?.message}
            <input
              type="text"
              name="email"
              placeholder="E-mail..."
              {...register("email")}
            />
            {errors.email?.message}

            <input
              type="password"
              name="password"
              placeholder="Hasło..."
              {...register("password")}
            />
            {errors.password?.message}

            <input
              type="password"
              name="confirmPwd"
              placeholder="Potwierdź hasło..."
              {...register("confirmPwd")}
            />
            {errors.confirmPwd && "Hasła muszą być takie same!"}

            <div className="btn">
              <input type={"submit"} value="Zarejestruj" />
            </div>
          </form>
          <div className="login-link">
            Posiadasz konto?
            <Link to="/zalogujsie"> Zaloguj się!</Link>
          </div>
        </div>
        <div className="col-2">
          <img src={img} alt="" />
        </div>
      </div>
    </section>
  );
}
