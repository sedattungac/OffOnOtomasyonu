using OffOnOtomasyonu.Models.Siniflar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using PagedList.Mvc;
//using OffOnOtomasyonu.Models.Sınıflar;
using System.IO;

namespace OffOnOtomasyonu.Controllers
{
    public class UrunController : Controller
    {
        //Get: Urun
        Context c = new Context();
        public ActionResult Index(string p)
        {

            var urunler = from x in c.Uruns select x;

            if (!string.IsNullOrEmpty(p))
            {
                urunler = urunler.Where(y => y.UrunAd.Contains(p));
            }
            return View(urunler.ToList());

        }
        [HttpGet]
        public ActionResult YeniUrun()
        {


            List<SelectListItem> deger1 = (from x in c.Kategoris.ToList()
                                           select new SelectListItem
                                           {
                                               Text = x.KategoriAd,
                                               Value = x.KategoriID.ToString()



                                           }).ToList();
            ViewBag.dgr1 = deger1;



            return View();


        }
        [HttpPost]
        public ActionResult YeniUrun(Urun p)
        {
            if (Request.Files.Count > 0)
            {
                string dosyaadi = Path.GetFileName(Request.Files[0].FileName);
                string uzanti = Path.GetExtension(Request.Files[0].FileName);
                string yol = "~/Image/" + dosyaadi + uzanti;
                Request.Files[0].SaveAs(Server.MapPath(yol));
                p.UrunGorsel = "/Image/" + dosyaadi + uzanti;

            }

            p.Durum = true;
            c.Uruns.Add(p);
            c.SaveChanges();
            return RedirectToAction("Index");


        }
        public ActionResult UrunKaldir(int id)
        {
            var deger = c.Uruns.Find(id);
            deger.Durum = false;
            c.SaveChanges();
            return RedirectToAction("GuncelUrunListesi");


        }
        public ActionResult UrunGetir(int id)
        {




            List<SelectListItem> deger1 = (from x in c.Kategoris.ToList()
                                           select new SelectListItem
                                           {
                                               Text = x.KategoriAd,
                                               Value = x.KategoriID.ToString()



                                           }).ToList();
            ViewBag.dgr1 = deger1;




            var urundeger = c.Uruns.Find(id);
            return View("UrunGetir", urundeger);



        }
        public ActionResult UrunGuncelle(Urun p, HttpPostedFileBase UrunGorsel)
        {


            //if (Request.Files.Count > 0)
            //{
            //    string dosyaadi = Path.GetFileName(Request.Files[0].FileName);
            //    string uzanti = Path.GetExtension(Request.Files[0].FileName);
            //    string yol = "~/Image/" + dosyaadi + uzanti;
            //    Request.Files[0].SaveAs(Server.MapPath(yol));
            //    p.UrunGorsel = "/Image/" + dosyaadi + uzanti;

            //}

            var urn = c.Uruns.Find(p.Urunid);
            urn.Kategoriid = p.Kategoriid;
            urn.AlisFiyat = p.AlisFiyat;
            //urn.Durum = p.Durum;
            urn.Marka = p.Marka;
            urn.SatisFiyat = p.SatisFiyat;
            urn.Stok = p.Stok;
            urn.UrunAd = p.UrunAd;
            //urn.UrunGorsel = p.UrunGorsel;
            if (ModelState.IsValid)

            {



                if (UrunGorsel != null)

                {

                    string dosyaadi = Path.GetFileName(UrunGorsel.FileName);



                    string yol = "/Image/" + dosyaadi;

                    UrunGorsel.SaveAs(Server.MapPath(yol));

                    urn.UrunGorsel = yol;

                }

            }
            c.SaveChanges();
            return RedirectToAction("Index");



        }
        public ActionResult UrunListesi()
        {
            var urunler = c.Uruns.Where(x => x.Durum == true).ToList();
            return View(urunler);
        }
        public ActionResult GuncelUrunListesi(int sayfa = 1)
        {



            var urunler = c.Uruns.Where(x => x.Durum == true).ToList().ToPagedList(sayfa, 10);
            return View(urunler);


        }

        public ActionResult TumUrunListesi()
        {
            var urunler = c.Uruns.ToList();
            return View(urunler);
        }

        public ActionResult UrunGeriGetir()
        {
            var urunler = c.Uruns.Where(x => x.Durum == false).ToList();
            return View(urunler);

        }
        public ActionResult UrunGeriAl(int id)
        {
            var deger = c.Uruns.Find(id);
            deger.Durum = true;
            c.SaveChanges();
            return RedirectToAction("UrunGeriGetir");


        }
        public ActionResult UrunSil(int id)
        {
            var ktg = c.Uruns.Find(id);
            c.Uruns.Remove(ktg);
            c.SaveChanges();
            return RedirectToAction("UrunGeriGetir");

        }
        public ActionResult UrunGeriGetirListesi()
        {

            var urunler = c.Uruns.Where(x => x.Durum == false).ToList();
            return View(urunler);

        }
        [HttpGet]
        public ActionResult SatisYap(int id)
        {

            List<SelectListItem> deger3 = (from x in c.Personels.ToList()
                                           select new SelectListItem
                                           {
                                               Text = x.PersonelAd + " " + x.PersonelSoyad,
                                               Value = x.Personelid.ToString()
                                           }).ToList();

            List<SelectListItem> deger4 = (from x in c.Carilers.ToList()
                                           select new SelectListItem
                                           {
                                               Text = x.CariAd + " " + x.CariSoyad,
                                               Value = x.Cariid.ToString()
                                           }).ToList();

            ViewBag.dgr3 = deger3;
            ViewBag.dgr4 = deger4;
            var deger1 = c.Uruns.Find(id);

            ViewBag.dgr1 = deger1.Urunid;
            ViewBag.dgr2 = deger1.SatisFiyat;

            return View();

        }

        [HttpPost]
        public ActionResult SatisYap(SatisHareket p)
        {
            p.Tarih = DateTime.Parse(DateTime.Now.ToShortDateString());
            c.SatisHarekets.Add(p);
            c.SaveChanges();
            return RedirectToAction("Index", "Satis");
        }
    }
}