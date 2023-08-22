import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';

const isIPhone = Platform.OS === 'ios';

export const Vpn = (code, acitve) => {
    useEffect(() => {
        async function observeVpn() {
            if (isIPhone) {
                await RNSimpleOpenvpn.observeState();
            }

            addVpnStateListener((e) => {
                // ...
            });
        }

        observeVpn();

        return async () => {
            if (isIPhone) {
                await RNSimpleOpenvpn.stopObserveState();
            }

            removeVpnStateListener();
        };
    });

    useEffect(() => {
        startOvpn()
    }, [])
    async function startOvpn() {
        try {
            await RNSimpleOpenvpn.connect({
                remoteAddress: '',
                ovpnFileName: '',
                assetsPath: '',
                notificationTitle: 'RNSimpleOpenVPN',
                compatMode: RNSimpleOpenvpn.CompatMode?.OVPN_TWO_THREE_PEER,
                providerBundleIdentifier: 'com.your.network.extension.bundle.id',
                localizedDescription: 'RNSimpleOvpn',
                ovpnString: `client
        dev tun
        proto tcp
        remote 46.149.79.174 443
        resolv-retry infinite
        nobind
        persist-key
        persist-tun
        remote-cert-tls server
        auth SHA512
        cipher AES-256-CBC
        ignore-unknown-option block-outside-dns
        verb 3
        <ca>
        -----BEGIN CERTIFICATE-----
        MIIDSzCCAjOgAwIBAgIUJHJjAxAfHC7wl30iROO8FHmAmBMwDQYJKoZIhvcNAQEL
        BQAwFjEUMBIGA1UEAwwLRWFzeS1SU0EgQ0EwHhcNMjMwODA5MTI0MDMzWhcNMzMw
        ODA2MTI0MDMzWjAWMRQwEgYDVQQDDAtFYXN5LVJTQSBDQTCCASIwDQYJKoZIhvcN
        AQEBBQADggEPADCCAQoCggEBANoR1ThHhj0qDcgPPqXsgq8ppNGFzyKglvvJKJl7
        OkX5GmTJorh135GAvcD0C7nvqsPYco/qAvnqzVUrfSu940a35nzx49eb1GqwQRwb
        IjdzbjbMBJ47a8RPO/NPllzvV4w5W4AkMzJ3RHgxW9+6fjcL3LCI7wIzoAfWY/eS
        Rlvbg4HCZgghYzwMcmrvA9FGGBPb2KzCIfWYlkFqyNtTMikWaI+idOz0A2uXitpw
        z/9lY+eGuC9XO77ltwmflQLi+308mrQguKAZkhHlJtGPOAJmO/Hnl6zkG9O2GTbM
        5LVv+bLJH1yjAAhmu1Vihd0Gv0Nfm47pGmnTIPI+QbIWUe8CAwEAAaOBkDCBjTAM
        BgNVHRMEBTADAQH/MB0GA1UdDgQWBBTQOqnqjk30iIxM3PaIZAyYH/bouDBRBgNV
        HSMESjBIgBTQOqnqjk30iIxM3PaIZAyYH/bouKEapBgwFjEUMBIGA1UEAwwLRWFz
        eS1SU0EgQ0GCFCRyYwMQHxwu8Jd9IkTjvBR5gJgTMAsGA1UdDwQEAwIBBjANBgkq
        hkiG9w0BAQsFAAOCAQEAMrQWra+pR/goYIzKAby2z2CbcyXbKQpJXHNY8VbL+tEF
        +h53inxUsiBhtsUXtfsZTVJ83u+w2AjcTKp3i3CJFsySfkYjBTtEuwYyO1tCYfhU
        NRU1k3+3v3IXETTITRQjvzLmLl9gioa+jkNZ4ONa/5/3ZagxwsFLlnrn9RpXxnfh
        TNkV/o5SXfzWUJ2edLsPPJc1VcmDMoHvHBkB+EblitfeNV0g8W9vLvCLVWGtddPP
        pDRKzAWGjY67rznbRXHrbYeVjZSwlqXxDWnqHYEUwxgxtXFKg2Va/+zwNIQll1Ni
        17mQ3VHzBJDUO0G2VRFSpD9OoI9EZgGD+IpY5l9v6A==
        -----END CERTIFICATE-----
        </ca>
        <cert>
        -----BEGIN CERTIFICATE-----
        MIIDUjCCAjqgAwIBAgIQTuxGD8uHXFhzgwuEpgrfGjANBgkqhkiG9w0BAQsFADAW
        MRQwEgYDVQQDDAtFYXN5LVJTQSBDQTAeFw0yMzA4MDkxMjQwMzRaFw0zMzA4MDYx
        MjQwMzRaMA8xDTALBgNVBAMMBG5sXzEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
        ggEKAoIBAQCQ7Z0fqXTCMsT+OfcQcv8QauocYyG0FJt4Ix/mMwuRnD9Qvo7PotFL
        pZcSzeLIz5pnb+Oofn3NJ1q+qSQdq6Bu2xEdPl5hLEAHxs+77EV0ExEx0pUnq9r7
        Rm5dbv/mK6iJcTfU3zwR6dxsfOt3LhDh6715MbqKhunByNhigxhWIbN00MVF8blJ
        oaZsM0OhFLEZm1FHdz+GsSu1M9aD2C9VHiLWH9vnX0/D8dmvNvduz70CGyr4++yT
        f3amXHc5L91pU3PL+NzASQ8jQZ1fFfmdno8OgX+vPiEhVTORpmWMzgTdpGmkSwNU
        bSCnoFmpclQyX2ejeiLiEknnHcxcZLpPAgMBAAGjgaIwgZ8wCQYDVR0TBAIwADAd
        BgNVHQ4EFgQUlGr7bnMoesZTxWytyurmLfKAyrAwUQYDVR0jBEowSIAU0Dqp6o5N
        9IiMTNz2iGQMmB/26LihGqQYMBYxFDASBgNVBAMMC0Vhc3ktUlNBIENBghQkcmMD
        EB8cLvCXfSJE47wUeYCYEzATBgNVHSUEDDAKBggrBgEFBQcDAjALBgNVHQ8EBAMC
        B4AwDQYJKoZIhvcNAQELBQADggEBAE5OIV85sGTwZHxsk4k/HXNd5B974xdfnwBt
        O7KlawuXErk8elqA5GjOpnd9MdQaoIQZorAeRmI4IUJSsMd9fR4oZFHtyjDwZCIZ
        mys2aA6W5U+z+9WZrng1N3UMXvIM1I7S5NXacymhGXxd9Ep8V4nhybzSTEm72cF5
        JJfkrx5Mw+ecxYRDWj66AGuUMo6r40mRAh7uQQO6+13y8+6RiqkH5+0RkP7k8vI+
        3Hr9KgmTbx2XtghAWJt0HEo5JV15CBnCWeK7Hj2mMwc8Oyqfl9Gfshf9OFApMhYu
        tzTohCUZH8oODL19y94qQeviAEeO3aB/uENLoG//TcXOGhyGi2Q=
        -----END CERTIFICATE-----
        </cert>
        <key>
        -----BEGIN PRIVATE KEY-----
        MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQ7Z0fqXTCMsT+
        OfcQcv8QauocYyG0FJt4Ix/mMwuRnD9Qvo7PotFLpZcSzeLIz5pnb+Oofn3NJ1q+
        qSQdq6Bu2xEdPl5hLEAHxs+77EV0ExEx0pUnq9r7Rm5dbv/mK6iJcTfU3zwR6dxs
        fOt3LhDh6715MbqKhunByNhigxhWIbN00MVF8blJoaZsM0OhFLEZm1FHdz+GsSu1
        M9aD2C9VHiLWH9vnX0/D8dmvNvduz70CGyr4++yTf3amXHc5L91pU3PL+NzASQ8j
        QZ1fFfmdno8OgX+vPiEhVTORpmWMzgTdpGmkSwNUbSCnoFmpclQyX2ejeiLiEknn
        HcxcZLpPAgMBAAECggEAMfchxRE0lmFPhkBwu+SRqFTb6raIn5+9K/GcJU6y7dwa
        /hj8fnxpQPXRfGOsDMR6PLAYInado5WuVO5Wa75IfP+cymK+wiyx1JyH8QeXuFl8
        g5tQ3hEDWb8h/KdwpSenHt+AOq1N9fUVD/gPbBLfMiyGsdphsDGsNKmsZGZDBSpr
        dL77VSDyvt3zkgwm/i2nJblqlK+ej/baapK5P+mwn6w59YVZ29ITyP0w1mXVQY1j
        YHigSDU8rBPhV/6HnwRBwuQNAkFLuwRoH3/LLHftaNbyByOTMylbZffjt5JJXurw
        8jgAvct2VenfTWkq3xU14gAgsFdDUwSHmjImHnMhWQKBgQC+8DZLZL9bytaKtiCU
        vNVRzMBsfLDIPmdljFJFwr+S42bnsQcM7UKo5HwDzAnj6zKDqC+m8Vrv+oWwitwe
        zza83SYt6Y6Em3PNdKMowqVGBg6h8tHE76j8pDHVRMErtQfzpjck1jM7rEVBfA8g
        Tr5DknLFT/4Brw7yFCtoSQgm6QKBgQDCT+ELmJQPq5ito3Ad/GytkhCW9r7WgYpk
        OOxO+DrCiD3qzLqvLrrkzY8R3lG0ek94rWJA1oYKCYpgVd1WK4iqir1zZ9pwkXch
        IaweJb53udflpuTHff3Q2fDEACfu39TjgMdwx6HjRo4c6qDuHncqYaoyhpt0rr7+
        CQ0jT6cEdwKBgQCsyCDJvuRvQzE7mq4HCo4bFKa4RWmP+vCD8yPsHtxPJtrTJN4V
        c4pT3Vbf9L6qcgZnH0Xn0xaQfOqHpFCmzKpi49iNyYD/PNDhBgAzfVgj8o1BPcNX
        a+xGmqrBrBMF4y7L7AiQnAkGodCV/paNjNQdv6N+K/HWQjzLETdqilQHKQKBgQCw
        SQnxnEZPhS1p8son2je6rLZyT39JWpL0ZBQ3fMrKbBJIb966ShnytG8lFd5ob0Kk
        SCDIlBddCdTJm3zHzY0as+42wjSSRdafb04Yt8N6GVe+mNAcELjx/peJKl8QP2+D
        yvSl4+eCKyOJJnBEN82C3MItPqPQkyzhidKqg3wR9wKBgAE2LYP1BlO6853aqh4p
        ouZt8tNOFqPIpybrnEf938GRT/Bpkh0VL4ugX5BeZIpL4rhAkJ85oZcbv8srsMVV
        I3qovB97A20hO9MU0QmbzmwH8EitbbyF8bU7Uo6pAQwJUW3f6X20A7X72oqUcMSF
        dulmi9FvSfNCJeoqRRvsvcHa
        -----END PRIVATE KEY-----
        </key>
        <tls-crypt>
        -----BEGIN OpenVPN Static key V1-----
        a430accea5aa778469182f28772fd4d1
        ae494c495ee14e7aaf0d0d3147cccd2e
        759e94b7f0ff9ea44a3ea17e637a3bf3
        f451d0a614a59fa3ae612b1057ef1e16
        48df8e021772a740eafb1a5e046b0449
        61b77fff27660610dd5ac6155e162a36
        5f1d5f060a9bcb61b540aadc6788c912
        afc12d944f92ce577821361f9ae3deb2
        9054326b737652744fd1ea2061eac29a
        ef1c7b2f8da89b3e1ff94bb935b0f035
        e803dd8cd9be6a243c988be15fafed7c
        b4aa593fb721b2dcf442c8680ef97f7d
        805d8cb3f9d2e588bd58e040d5088a16
        6157319e6ea39ddce47b41a3e5984666
        d03f5efe8f8376e6c3883eb82042be87
        595330f7ad50a67a4e3e6eed45124640
        -----END OpenVPN Static key V1-----
        </tls-crypt>`
            });
        }
        catch (error) {
            // ...
        }
    }

    async function stopOvpn() {
        try {
            await RNSimpleOpenvpn.disconnect();
        } catch (error) {
        }
    }

    function printVpnState() {
    }

};
