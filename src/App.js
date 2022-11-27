import "./App.css";
import { useQuery } from "react-query";

function App() {
  const second = 1000;
  const minute = 60 * second;
  //Aşağıdaki, useQuery kullanarak normal bir fetch işlemine göre kod kalabalığını azalttık ve loading, rejected, fullfilled gibi durumları tek bir yerden yönetebiliyoruz.
  //POST requesti için useMutation kullanılabilir.
  //useQuery ile işlem yapılırken iki önemli parametre kullanılıyor: unique key ve fetcher function.
  //key: unique bir key olmalı. (buna ayrıca id de ekleyip bazı uygulamalar için kullanabilirsiniz Örn: chat uygulamalarındaki mesajları çekmek için; useQuery(['fetchMessages', id]...))
  //fetcher: data'ya erişmek için kullanılan fonksiyon.
  //Ayrıca react-query i paralel olarak birden fazla kez kullanabilirsiniz. Örn: useQuery('fetchMessages', fetchMessages) ve useQuery('fetchUsers', fetchUsers) gibi..
  const fetchData = useQuery(
    "jewelleryData",
    () =>
      fetch("https://fakestoreapi.com/products/category/jewelery").then((res) =>
        res.json()
      ),
    {
      staleTime: minute, //1 dakika sonra veriyi eskimiş/bayat(stale) olarak işaretler.
      refetchInterval: minute, //1 dakikada bir yeniden veriyi çeker (istek yollar).
      cacheTime: 5 * minute, //önbellekten silinme süresini ayarlayabiliriz.
      retry: 3, //istek başarısız olursa kaç kere tekrar deneyeceğini belirleyebiliriz.
      retryDelay: 1000, //tekrar deneme aralığını ayarlayabiliriz.
    }
    //refetchOnWindowFocus: pencereye tıklandığında yeniden istek yollanmasını sağlayabiliriz.
    //refetchOnMount: sayfa yenilendiğinde yeniden istek yollanmasını sağlayabiliriz.
    //refetchOnReconnect: internet bağlantısı kesildikten sonra yeniden istek yollanmasını sağlayabiliriz.
  );
  console.log(fetchData);

  //////// Bağımlı Sorgu: Eğer sorgunun yapılabilmesi bir önceki sorguya bağlı ise  sadece bir parametre ile bunu sağlayabilirsiniz.
  /**ÖRNEK:
  **Kullanıcıyı getir**
  const { data: user } = useQuery(["user", email], getUserByEmail);
  const userId = user?.id;
  **Kullanıcının projesini getir**
  const { isIdle, data: projects } = useQuery(
    ["projects", userId],
    getProjectsByUser,
    {
      **Kullanıcı ID'si gelene kadar sorgu çalışmayacaktır.**
      enabled: !!userId,
    }
  ); **/

  //////// Sayfalı Sorgu:
  //keepPreviousData: true yaparsanız, önceki sayfada gösterilen verileri yeni veri gelene kadar saklayacaktır.
  //Burada ise verinin güncelliğini kontrol etmek için isPreviousData kullanılır.
  //isPreviousData: boolean bir değer alır ve sayfa taleplerine göre değeri değişir. ÖRN: const {isPreviousData} = result;

  //////// Canlı Sorgu:
  //Bir input alanına her harf girildiğinde sorgu yapmak istediğimizi varsayarsak bunu react-query ile şöyle yapabiliriz:
  /**ÖRNEK:
   const [value, setValue] = useState('');
    const {
        data: aaro,
        isLoading,
        error,
        isFetching,
    } = useQuery(
        ['aaroCari', value],
        ({ signal }) => //axios signal parametresi ile isteğin iptal edilmesini sağlayabiliriz.
            axios.get(
                `${config.url.AARO_BASE}/api/Cari?EsnekAramaKisiti=${value}`,
                {
                    headers,
                    signal,
                }
            ),
        {
            enabled: Boolean(value),
        }
    ); **/
  //Burada signal parametresini olmadığını varsayarsak, kullanıcı her harf girdiğinde sorgu yapılacak ve sadece sonuncu sorgu aktif sorgu olarak gösterilecek. Fakat server tarafından hala boş da olsa önceki sorgulardan yine de data çekilecektir.
  //Bu durumda server tarafını gereksiz sorgular ile meşgul etmemek için axios'un *signal* parametresini kullanabiliriz.
  return (
    <div className="App">
      {fetchData?.isLoading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div>
          {fetchData?.data?.map((data, index) => (
            <img width={100} key={index} src={data.image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
