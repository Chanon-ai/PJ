const { defineConfig } = require("@vue/cli-service");

function isObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

module.exports = defineConfig({
  transpileDependencies: true,

  /**
   * ถ้ามึงเป็น SPA หน้าเดียว ก็ปล่อยไว้แบบนี้ได้เลย
   * ถ้าจะเพิ่มหน้า ให้เพิ่มใน pages แล้ว "ห้าม" filename ซ้ำกัน
   */
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      // title: "project-caption-new",
    },

    // ตัวอย่างเพิ่มหน้าใหม่ (อย่าลืม filename ต้องไม่ซ้ำ)
    // audit: {
    //   entry: "src/audit/main.js",
    //   template: "public/audit.html",
    //   filename: "audit.html",
    // },
  },
  devServer: {
  port: 8080,
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
    },
    "/uploads": {
      target: "http://localhost:5000",
      changeOrigin: true,
      "/health": { 
        target: "http://localhost:5000", 
        changeOrigin: true,
      },
    },

  },
},

  /**
   * ✅ proxy ให้ Vue ยิงไป backend ได้แบบไม่ติด CORS
   * เรียกจาก frontend ได้เลย: /api/... และ /uploads/...
   */
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },

  chainWebpack: (config) => {
    /**
     * 1) กัน BASE_URL not defined: อัด BASE_URL เข้า templateParameters ให้ทุก html plugin ที่มีจริง
     */
    const htmlKeys = [...config.plugins.store.keys()].filter((k) =>
      k.startsWith("html")
    );

    for (const key of htmlKeys) {
      config.plugin(key).tap((args) => {
        const opts = args[0] || {};
        const prev = opts.templateParameters;

        opts.templateParameters = (...tpArgs) => {
          const base =
            typeof prev === "function"
              ? prev(...tpArgs)
              : isObject(prev)
              ? prev
              : {};

          return {
            ...base,
            BASE_URL: process.env.BASE_URL || "/",
          };
        };

        args[0] = opts;
        return args;
      });
    }

    /**
     * 2) กัน "Multiple assets emit different content to the same filename"
     *    สาเหตุหลักคือ output filename ชนกัน (โดยเฉพาะ index.html)
     *    เราจะ enforce ว่า html plugin แต่ละตัว filename ต้อง unique
     */
    const seen = new Set();
    for (const key of htmlKeys) {
      config.plugin(key).tap((args) => {
        const opts = args[0] || {};
        let filename = opts.filename || "index.html";

        // ถ้า filename ชนกัน ให้เติม suffix ตามชื่อ plugin ไปเลย
        if (seen.has(filename)) {
          const safeKey = String(key).replace(/[^a-z0-9_-]/gi, "");
          const ext = filename.endsWith(".html") ? ".html" : "";
          const baseName = filename.replace(/\.html$/i, "");
          filename = `${baseName}.${safeKey}${ext || ".html"}`;
        }

        seen.add(filename);
        opts.filename = filename;

        args[0] = opts;
        return args;
      });
    }

    /**
     * 3) กัน CopyWebpackPlugin copy index.html ไปชน HtmlWebpackPlugin
     *    public/ จะถูก copy ไป dist อยู่แล้ว (static assets)
     *    แต่ index.html ต้องให้ HtmlWebpackPlugin เป็นคนสร้างคนเดียว
     */
    if (config.plugins.has("copy")) {
      config.plugin("copy").tap((args) => {
        const copyOpts = args[0] || {};
        if (Array.isArray(copyOpts.patterns)) {
          copyOpts.patterns = copyOpts.patterns.map((p) => {
            const pp = { ...p };
            pp.globOptions = pp.globOptions || {};
            const ignore = new Set(pp.globOptions.ignore || []);

            // ignore index.html ทุกที่
            ignore.add("**/index.html");

            pp.globOptions.ignore = [...ignore];
            return pp;
          });
        }
        args[0] = copyOpts;
        return args;
      });
    }
  },
});
