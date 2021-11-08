using OffOnOtomasyonu.Models.Siniflar;
using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OffOnOtomasyonu.Models.Sınıflar;
namespace OffOnOtomasyonu.Controllers
{
    public class CariController : Controller
    {
        // GET: Cari
        Context c = new Context();
        public ActionResult Index(string p)
        {

            var urunler = from x in c.Carilers select x;
            if (!string.IsNullOrEmpty(p))
            {
                urunler = urunler.Where(y => y.CariAd.Contains(p));
            }
            return View(urunler.ToList());

        }
        [HttpGet]
        public ActionResult YeniCari()
        {
            return View();

        }
        [HttpPost]
        public ActionResult YeniCari(Cariler p)

        {
            if (!ModelState.IsValid)
            {
                return View("YeniCari");
            }

            p.Durum = true;
            c.Carilers.Add(p);
            c.SaveChanges();
            return RedirectToAction("Index");


        }
        public ActionResult CariKaldir(int id)
        {
            var cr = c.Carilers.Find(id);
            cr.Durum = false;
            c.SaveChanges();
            return RedirectToAction("Index");

        }
        public ActionResult CariGetir(int id)
        {
            var cari = c.Carilers.Find(id);
            return View("CariGetir", cari);
        }
        public ActionResult CariGuncelle(Cariler p)
        {
            if (!ModelState.IsValid)
            {
                return View("CariGetir");
            }
            var cari = c.Carilers.Find(p.Cariid);
            cari.CariAd = p.CariAd;
            cari.CariSoyad = p.CariSoyad;
            cari.CariSehir = p.CariSehir;
            cari.CariMail = p.CariMail;
            cari.CariTel = p.CariTel;
            cari.CariAdres = p.CariAdres;
            c.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult MusteriSatis(int id)
        {
            var degerler = c.SatisHarekets.Where(x => x.Cariid == id).ToList();
            var cr = c.Carilers.Where(x => x.Cariid == id).Select(y => y.CariAd + " " + y.CariSoyad).FirstOrDefault();
            ViewBag.cari = cr;
            var ct = c.Carilers.Where(x => x.Cariid == id).Select(y => y.CariTel + " ").FirstOrDefault();
            ViewBag.caris = ct;
            var cy = c.Carilers.Where(x => x.Cariid == id).Select(y => y.CariSehir + " ").FirstOrDefault();
            ViewBag.carisy = cy;
            var cu = c.Carilers.Where(x => x.Cariid == id).Select(y => y.CariMail + " ").FirstOrDefault();
            ViewBag.carisu = cu;

            return View(degerler);


        }


        public ActionResult CariGeriGetir()
        {
            var cariler = c.Carilers.Where(x => x.Durum == false).ToList();
            return View(cariler);

        }
        public ActionResult CariGuncelListe()
        {
            var cariler = c.Carilers.Where(x => x.Durum == true).ToList();
            return View(cariler);

        }


        public ActionResult CariGeriAl(int id)
        {
            var deger = c.Carilers.Find(id);
            deger.Durum = true;
            c.SaveChanges();
            return RedirectToAction("Index");


        }

        public ActionResult TumCariListesi()
        {
            var urunler = c.Carilers.ToList();
            return View(urunler);
        }

        public ActionResult CariGeriGetirListesi()
        {

            var urunler = c.Carilers.Where(x => x.Durum == false).ToList();
            return View(urunler);

        }
        public ActionResult CariGuncelListesi()
        {

            var urunler = c.Carilers.Where(x => x.Durum == true).ToList();
            return View(urunler);

        }
        public ActionResult CariSil(int id)
        {
            var ktg = c.Carilers.Find(id);
            c.Carilers.Remove(ktg);
            c.SaveChanges();
            return RedirectToAction("Index");

        }

        public ActionResult CariListe(int sayfa = 1)
        {

            var degerler = c.Carilers.ToList().ToPagedList(sayfa, 15);

            return View(degerler);


        }

    }
}