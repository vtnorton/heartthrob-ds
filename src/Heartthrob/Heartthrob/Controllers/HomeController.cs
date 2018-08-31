using Microsoft.AspNetCore.Mvc;

namespace Heartthrob.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Index.cshtml");
        }

        [Route("/2")]
        public IActionResult InputFields()
        {
            return View("~/Views/InputFields.cshtml");
        }
    }
}
