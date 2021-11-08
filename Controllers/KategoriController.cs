﻿using OffOnOtomasyonu.Models.Siniflar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using PagedList.Mvc;
using OffOnOtomasyonu.Models.Sınıflar;

namespace OffOnOtomasyonu.Controllers
{
    public class KategoriController : Controller
    {
        // GET: Kategori
        Context c = new Context();
        public ActionResult Index(int sayfa = 1)
        {

            var degerler = c.Kategoris.ToList().ToPagedList(sayfa, 5);

            return View(degerler);


        }
        [HttpGet]
        public ActionResult KategoriEkle()
        {
            return View();
        }
        [HttpPost]
        public ActionResult KategoriEkle(Kategori k)
        {
            c.Kategoris.Add(k);
            c.SaveChanges();

            return RedirectToAction("KategoriEkle");


        }
        public ActionResult KategoriSil(int id)
        {
            var ktg = c.Kategoris.Find(id);
            c.Kategoris.Remove(ktg);
            c.SaveChanges();
            return RedirectToAction("Index");

        }
        public ActionResult KategoriGetir(int id)
        {
            var kategori = c.Kategoris.Find(id);
            return View("KategoriGetir", kategori);

        }
        public ActionResult KategoriGuncelle(Kategori k)
        {
            var ktgr = c.Kategoris.Find(k.KategoriID);
            ktgr.KategoriAd = k.KategoriAd;
            c.SaveChanges();
            return RedirectToAction("Index");

        }
        //KATEGORİYE GÖRE ÜRÜN LİSTELEME
        //public ActionResult Deneme()
        //{
        //    Class3 cs = new Class3();
        //    cs.Kategoriler = new SelectList(c.Kategoris, "KategoriID", "KategoriAd");
        //    cs.Urunler = new SelectList(c.Uruns, "Urunid", "UrunAd");
        //    return View(cs);
        //}
        //public JsonResult UrunGetir(int p)
        //{


        //    var urunlistesi = (from x in c.Uruns
        //                       join y in c.Kategoris
        //                       on x.Kategori.KategoriID equals y.KategoriID
        //                       where x.Kategori.KategoriID == p
        //                       select new
        //                       {
        //                           Text = x.UrunAd,
        //                           value = x.Urunid.ToString()
        //                       }).ToList();
        //    return Json(urunlistesi, JsonRequestBehavior.AllowGet);


        //}
    }
}