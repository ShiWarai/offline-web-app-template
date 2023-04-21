package ru.mirea.offline_web_app;

import android.content.res.AssetManager;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;

import fi.iki.elonen.NanoHTTPD;

public class WebServer extends NanoHTTPD {

    private AssetManager assets;

    public WebServer(AssetManager assets, Integer port) throws IOException {
        super(port);

        this.assets = assets;
        start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
        System.out.println("Running! Point your browsers to http://localhost:" + port.toString());
    }

    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();

        System.out.println(uri);

        String path;
        String mimeType;

        try {
            if (uri.equals("/")) {
                path = "index.html";
                mimeType = "text/html";
            } else {
                path = uri.substring(1);
                mimeType = probeContent(path);
            }

            InputStream inputStream = assets.open(path);
            return newChunkedResponse(Response.Status.OK, mimeType, inputStream);
        } catch (IOException e) {
            e.printStackTrace();
            return newFixedLengthResponse(Response.Status.BAD_REQUEST, "text/html", "<h1>Something wrong with assets</h1>");
        }
    }

    private String probeContent(String path) throws IOException {
        InputStream is = assets.open(path);
        String mimeType = URLConnection.guessContentTypeFromStream(is);
        is.close();
        return mimeType;
    }
}