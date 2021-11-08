using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OffOnOtomasyonu.Models.Sınıflar;
using OffOnOtomasyonu.Models.Siniflar;
using PagedList;
using PagedList.Mvc;
using System.IO;

namespace OffOnOtomasyonu.Controllers
{
    public class PersonelController : Controller
    {
        // GET: Personel
        Context c = new Context();
        public ActionResult Index(int sayfa = 1)
        {
            var degerler = c.Personels.ToList().ToPagedList(sayfa, 10);
            return View(degerler);
        }
        [HttpGet]
        public ActionResult PersonelEkle()
        {
            List<SelectListItem> deger1 = (from x in c.Departmans.ToList()
                                           select new SelectListItem
                                           {
                                               Text = x.DepartmanAd,
                                               Value = x.Departmanid.ToString()



                                           }).ToList();
            ViewBag.dgr1 = deger1;


            return View();

        }
        [HttpPost]
        public ActionResult PersonelEkle(Personel p)
        {
            if (Request.Files.Count > 0)
            {
                string dosyaadi = Path.GetFileName(Request.Files[0].FileName);
                string uzanti = Path.GetExtension(Request.Files[0].FileName);
                string yol = "~/Image/" + dosyaadi + uzanti;
                Request.Files[0].SaveAs(Server.MapPath(yol));
                p.PersonelGorsel = "/Image/" + dosyaadi + uzanti;

            }

            c.Personels.Add(p);
            c.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult PersonelGetir(int id)
        {

            List<SelectListItem> deger1 = (from x in c.Departmans.ToList()
                                           select new SelectListItem
                                           {
                                               Text = x.DepartmanAd,
                                               Value = x.Departmanid.ToString()



                                           }).ToList();
            ViewBag.dgr1 = deger1;


            var prs = c.Personels.Find(id);
            return View("PersonelGetir", prs);
        }
        public ActionResult PersonelGuncelle(Personel p, HttpPostedFileBase PersonelGorsel)
        {



            //if (Request.Files.Count > 0)
            //{
            //    string dosyaadi = Path.GetFileName(Request.Files[0].FileName);
            //    string uzanti = Path.GetExtension(Request.Files[0].FileName);
            //    string yol = "~/Image/" + dosyaadi + uzanti;
            //    Request.Files[0].SaveAs(Server.MapPath(yol));
            //    p.PersonelGorsel = "/Image/" + dosyaadi + uzanti;

            //}

            var prsn = c.Personels.Find(p.Personelid);
            prsn.PersonelAd = p.PersonelAd;
            prsn.PersonelSoyad = p.PersonelSoyad;
            //prsn.PersonelGorsel = p.PersonelGorsel;
            prsn.Departmanid = p.Departmanid;
            prsn.PersonelAdres = p.PersonelAdres;
            prsn.PersonelMail = p.PersonelMail;
            prsn.PersonelTel = p.PersonelTel;

            if (ModelState.IsValid)

            {



                if (PersonelGorsel != null)

                {

                    string dosyaadi = Path.GetFileName(PersonelGorsel.FileName);



                    string yol = "/Image/" + dosyaadi;

                    PersonelGorsel.SaveAs(Server.MapPath(yol));

                    prsn.PersonelGorsel = yol;

                }

            }

            c.SaveChanges();
            return RedirectToAction("Index");


        }
        public ActionResult PersonelSil(int id)
        {
            var ktg = c.Personels.Find(id);
            c.Personels.Remove(ktg);
            c.SaveChanges();
            return RedirectToAction("Index");

        }

        public ActionResult PersonelListe()
        {

            var sorgu = c.Personels.ToList();


            return View(sorgu);


        }
    }
}