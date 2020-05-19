package com.romengine.rental.app.controller;

import org.hyperledger.fabric.gateway.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeoutException;

@RestController
@RequestMapping(("rental"))
public class RentalController {

    @GetMapping("user/{id}")
    public String getUser(@PathVariable String id) {
        Gateway.Builder builder = Gateway.createBuilder();
        String contractName="rental";

        try {
            // A wallet stores a collection of identities
            Path walletPath = Paths.get("D:/Dev/projects/fabric-romengine/application/identity/user/isabella/wallet");
            Wallet wallet = Wallets.newFileSystemWallet(walletPath);
            System.out.println("Read wallet info from: " + walletPath);

            String userName = "isabella";

            Path connectionProfile = Paths.get("D:/Dev/projects/fabric-romengine/application/gateway/connection-profile.yaml");

            // Set connection options on the gateway builder
            builder.identity(wallet, userName).networkConfig(connectionProfile).discovery(false);

            // Connect to gateway using application specified parameters
            try(Gateway gateway = builder.connect()) {

                // Access PaperNet network
                System.out.println("Use network channel: rental.");
                Network network = gateway.getNetwork("rental");

                Contract contract = network.getContract(contractName, "org.rentalnet.rental");

                // Buy commercial paper
                System.out.println("Submit commercial paper buy transaction.");
                byte[] response = contract.submitTransaction("queryUser", "user01");

                // Process response
                System.out.println("Process buy transaction response.");
                return new String(response);
            }
        } catch (GatewayException | IOException | TimeoutException | InterruptedException e) {
            e.printStackTrace();
            System.exit(-1);
        }
        return "";
    }



}
