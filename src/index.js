import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
//Burada QueryClientProvider ile react-query'i uygulamamıza bağlıyoruz.Bu sayede uygulamamızda react-query kullanabiliriz.
//QueryClient: react-query'nin sorgularını saklayacağı yerdir.
//contextSharing: true yaparsanız, uygulamanızda birden fazla QueryClient kullanabilirsiniz.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
