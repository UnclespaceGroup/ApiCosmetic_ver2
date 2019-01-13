using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ApiCosmetic_ver2.Controllers
{
    public class ImageController : ApiController
    {
        public async Task<IHttpActionResult> Post()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest();
            }
            var provider = new MultipartMemoryStreamProvider();
            // путь к папке на сервере

            // var type = file.Headers.ContentDisposition.type();
            string root = System.Web.HttpContext.Current.Server.MapPath("~/Images/");

            await Request.Content.ReadAsMultipartAsync(provider);

            foreach (var file in provider.Contents)
            {
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                if (System.IO.File.Exists(root + filename))
                {
                    System.IO.File.Delete(root + filename);
                }

                byte[] fileArray = await file.ReadAsByteArrayAsync();

                using (System.IO.FileStream fs = new System.IO.FileStream(root + filename, System.IO.FileMode.Create))
                {
                    await fs.WriteAsync(fileArray, 0, fileArray.Length);
                }
                return Ok(file);
            }
            return Ok("файлы загружены");
        }
    }
}
