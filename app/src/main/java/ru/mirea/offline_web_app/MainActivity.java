package ru.mirea.offline_web_app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.core.content.ContextCompat;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private WebServer server;
    private CustomTabsIntent customTabsIntent;

    final String url = "http://localhost";
    final Integer port = 8000;
    final Integer startUpDelay = 3000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        try {
            server = new WebServer(getAssets(), port);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (customTabsIntent == null) {
                    CustomTabsIntent.Builder customIntent = new CustomTabsIntent.Builder();
                    customIntent.setToolbarColor(ContextCompat.getColor(MainActivity.this, R.color.purple_200));
                    customIntent.setShowTitle(true);
                    customIntent.setUrlBarHidingEnabled(true);
                    customTabsIntent = customIntent.build();
                }

                openCustomTab(MainActivity.this, customTabsIntent, Uri.parse(url + ":" + port));
            }
        }, startUpDelay);


    }

    public static void openCustomTab(Activity activity, CustomTabsIntent customTabsIntent, Uri uri) {
        String packageName = "com.android.chrome";
        if (packageName != null) {
            customTabsIntent.intent.setPackage(packageName);
            customTabsIntent.launchUrl(activity, uri);
        } else {
            activity.startActivity(new Intent(Intent.ACTION_VIEW, uri));
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        server.closeAllConnections();
    }

    public void reloadTab(View view) {
        if (customTabsIntent != null) {
            openCustomTab(MainActivity.this, customTabsIntent, Uri.parse(url + ":" + port));
        }
    }
}