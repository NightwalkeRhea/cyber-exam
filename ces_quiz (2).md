
1. **Which of the following best describes tampering in the context of cybersecurity?**
   - a. Unauthorized alteration of a system or data ✅
   - b. Authorized maintenance of a system
   - c. Backing up data to steal it
   - d. Monitoring network traffic for packet sniffing

2. **How does a TPM usually contribute to the security of a device?**
   - a. It is responsible for real-time threat monitoring regarding processes, network connections, etc.
   - b. It is responsible for verifying the authenticity of the hardware and software configuration of the device, enforcing the overall system's trustworthiness. ✅
   - c. It is responsible for managing access control to resources such as encrypted files and peripherals so that applications or users that are not allowed cannot access resources.
   - d. None of the above. TPM stands for "Trusted Password Management"; it refers to the policies used to manage passwords in an organization.

3. **What is a Trusted Execution Environment (TEE)?**
   - a. A secure area of a processor that ensures code and data loaded inside are protected ✅
   - b. A secure area of a processor that ensures data loaded inside is protected
   - c. A secure channel between secure and non-secure computing regions in the microprocessor
   - d. A secure storage memory space

4. **Discuss the classification of hardware Trojans. Include in your answer the different types of hardware Trojans, their activation mechanisms, and the potential threats they pose to hardware security.**

   A Trojan is a malicious insertion or alteration in an IC, which is most of the time idle, then triggered by something, and then by means of the payload, it does some effect. We can classify Trojans by three concepts:

   - **How they are activated:**
     - Always-on: This is unlikely due to being more easily detectable.
     - External trigger: Receiving some signal from some sensors or antenna, can also be a logic combination.
     - Internal trigger: Triggered by some condition internal to the system, some logical combination.

   - **What they do (or what is the effect):**
     - Leak information, such as secret keys.

5. **Suppose that Alice (who shares with Bob the keys K1 and K2) wants to communicate with Bob guaranteeing confidentiality, integrity, and authenticity of the plaintext. She uses symmetric encryption and a keyed digest; therefore, she sends to Bob C = enc(P, K1) || MAC(P, K2) . C is the ciphertext, P is the plaintext, K1 is the key used to encrypt, and K2 is the key used to compute the keyed digest (MAC - message authentication code). Select the correct statement:**
   - a. Bob can efficiently verify the integrity and authenticity of the message since, before recomputing the MAC of P, he first needs to decrypt C.
   - b. Confidentiality, integrity, and authenticity are NOT granted because Alice used two keys, K1 and K2.
   - c. Using two different keys is a good idea since an external attacker needs to intercept/discover both to break all three properties simultaneously (confidentiality, integrity, authenticity). The downside is that sharing two keys is more complex than sharing a single key. ✅
   - d. None of the above.

6. **Which practice is effective in mitigating buffer overflow vulnerabilities?**
   - a. Using bounds checking on array accesses ✅
   - b. Using hash functions
   - c. Using stack canaries
   - d. Using bounds checking on function inputs

7. **What are the most important differences between password hashing functions and hash functions?**
   - a. Password hashing functions are fast and intentionally computationally intensive.
   - b. Hash functions are designed to store passwords securely because they cannot be reversed.
   - c. Hash functions are irreversible, while password hashing functions are reversible.
   - d. Hash functions can encrypt data since they cannot be reversed. Password hashing functions need to be faster for encryption.
   - e. Password hashing functions use a salt to add randomness to the hashed output. ✅

8. **Which of the following is a common vulnerability exploited in Test-Infrastructure-Based Attacks?**
   - a. Securely configured firewalls
   - b. Encrypted communication channels
   - c. Configurations of Testing environments ✅
   - d. Properly patched testing tools

9. **Which method is commonly used in anti-tampering techniques?**
   - a. Using redundant hardware
   - b. Encryption of data
   - c. Network segmentation
   - d. Physical isolation of systems

10. **A possible low overhead solution to watermark a circuit is:**
    - a. Remapping the logic of regions outside the critical-path. ✅
    - b. Removing combinational parts.
    - c. Removing sequential parts
    - d. Duplicate the circuit.

11. **Which component verifies the signature of the firmware in Secure Boot?**
    - a. Bootloader ✅
    - b. BIOS
    - c. Operating System
    - d. Kernel

12. **In what scenario is a Weak PUF typically used?**
    - a. Key generation and storage ✅
    - b. Device authentication
    - c. Generating pseudo-random numbers
    - d. Data encryption

13. **What can I achieve with Simple Power Analysis?**
    - a. I can correlate the power consumption of a device with the data it handles, allowing me to retrieve confidential information (such as the secret keys used during an AES encryption). ✅
    - b. I can correlate a device's power consumption with its operations, allowing me to perform some basic form of dynamic reverse engineering.
    - c. I can correlate a device's power consumption with its data storage locations, allowing me to retrieve confidential information in specific cases (as with some implementations of the RSA algorithm).
    - d. None of the above is correct.

14. **Select the appropriate statements about the differences between symmetric and asymmetric cryptography.**
    - a. When many actors are involved, asymmetric cryptography requires fewer keys than symmetric cryptography. ✅
    - b. Both do not need any intermediate actor to be used. For example, asymmetric cryptography does not necessarily need the asymmetric key pair to be verified by a certification authority (CA).
    - c. Asymmetric cryptography is less easy to use because it requires a phase known as crucial agreement.
    - d. By definition, one of these two techniques is superior in terms of security as it usually does not depend on the actual algorithm chosen, its implementation, and the "quality" (e.g., randomness) of the key.
    - e. Suppose confidentiality, integrity, authenticity, and non-repudiation are required and the plaintext size is significant (e.g., 2 GB). In that case, the best option (most efficient) is to guarantee confidentiality with an asymmetric algorithm and the other three properties with a symmetric algorithm.

15. **Which of the following best describes tampering in the context of cybersecurity?**
    - a. Unauthorized alteration of a system or data ✅
    - b. Authorized maintenance of a system
    - c. Backing up data to steal it
    - d. Monitoring network traffic for packet sniffing

16. **Which type of Root of Trust is embedded in hardware and difficult to tamper with?**
    - a. Hardware Root of Trust ✅
    - b. Software Root of Trust
    - c. Network Root of Trust
    - d. Virtual Root of Trust

17. **Which of the following methods can detect hardware Trojans?**
    - a. Side-channel analysis ✅
    - b. Signature-based detection
    - c. Sandboxing
    - d. Patch management

18. **In the layout of standard cells:**
    - a. The height is fixed and the width changes depending on the function of the cell ✅
    - b. The width is fixed and the height changes depending on the function of the cell
    - c. Both the height and the width are fixed and equal.
    - d. There is no restriction on height and width

19. **Which threat is TEE particularly designed to protect against?**
    - a. Malware and unauthorized access ✅
    - b. Physical theft of the device
    - c. Data confidentiality
    - d. Signal interference

20. **What is a block cipher?**
    - a. A method of encrypting data in fixed-size blocks ✅
    - b. A method of encrypting data one bit at a time
    - c. A public-key encryption algorithm
    - d. A hashing algorithm

21. **Discuss the role of place and route tools in digital ICs design flow. Include in your answer which are the inputs and the output and summarize the main aspects included in floorplanning, placement, and routing.**

    After choosing the functionality and the specifications of the IC, the next step is to write down a first Register Transfer Level (RTL) view, which means using a Hardware Description Language (HDL) to create an abstract view of the IC, defining the general function. RTL is then converted to a netlist.

    After designing the logic needed, it is time to choose how to implement it on the board. The first step, floorplanning, is the process of identifying and dividing the area of the silicon. This can be done with or without considering RTL or netlist, since it is a macro division.

    After floorplanning comes placement, where we decide how to place each node in the designed area. This is a delicate step since it has to be optimized to reduce delay between each gate.

    After placement comes routing, where we put the wires to link all the gates.

22. **Side channel-based watermarking:**
    - a. Is often based on a power consumption signature. ✅
    - b. Relies on a ring oscillator with an even number of inverters
    - c. Relies on an LFSR always initialized with all zeros.
    - d. Is a static watermarking technique

23. **FSM watermarking:**
    - a. Exploits free inputs to generate extra transitions. ✅
    - b. Cannot be applied to states.
    - c. Is a static watermarking technique.
    - d. Does not require any input pattern to be observed

24. **Which of the following methods can detect hardware Trojans?**
    - a. Side-channel analysis ✅
    - b. Signature-based detection
    - c. Sandboxing
    - d. Patch management

25. **When designing a Random Number Generator, which of the following randomness sources is the WORST choice:**
    - a. The variations in hardware resource usage (e.g., CPU, RAM) due to the scheduling of processes. ✅
    - b. The movement of the mouse while using a PC, combined with time.
    - c. Keyboard strokes combined with time.
    - d. Physical phenomena such as the noise a resistor produces, properly amplified and sampled.

26. **Which type of Root of Trust is embedded in hardware and difficult to tamper with?**
    - a. Hardware Root of Trust ✅
    - b. Software Root of Trust
    - c. Network Root of Trust
    - d. Virtual Root of Trust

27. **What is a PUF?**
    - a. A PUF is a physical characteristic of a device that is unique and difficult to replicate, used for secure identification and authentication. ✅
    - b. A PUF is a programmable microcontroller used in embedded systems for real-time processing
    - c. A PUF is a type of software algorithm designed to enhance data encryption
    - d. A PUF is a firmware update protocol used to enhance the functionality of hardware devices

28. **What can I achieve with Simple Power Analysis?**
    - a. I can correlate the power consumption of a device with the data it handles, allowing me to retrieve confidential information (such as the secret keys used during an AES encryption). ✅
    - b. I can correlate a device's power consumption with its operations, allowing me to perform some basic form of dynamic reverse engineering.
    - c. I can correlate a device's power consumption with its data storage locations, allowing me to retrieve confidential information in specific cases (as with some implementations of the RSA algorithm).
    - d. None of the above is correct.

29. **Why are Silicon PUFs considered secure?**
    - a. They are based on the inherent physical characteristics of silicon, making them unique and difficult to replicate
    - b. They are based on the physical characteristics of silicon, tunable to be unique and difficult to replicate
    - c. They are hidden in the physical chip
    - d. They are one-way functions based on cryptographic algoritms

30. **Discuss the key principes and practices involved in hardware security. Discuss the primary threats to hardware security and outline the strategies used to mitigate these threats**

31. **In which of the following scenarios is the use of Oblivious RAM (ORAM) particularly beneficial**
    - a. Enhancing privacy in cloud storage by concealing data access patterns  ✅
    - b. Improving the speed of data retrival in high-performance computing environments
    - c. Increasing the efficency and organization of distributed storage systems
    - d. Managing memory allocation to optimize virtual machine performance
  
32. **What is a primary benefit of using a Trusted Execution Environment (TEE)?**
    - a. Enhanced security for sensitive operations and data  ✅
    - b. Isolate processes for system performance
    - c. Isolate and encrypt process data
    - d. Lower the chanses of privilage escalation

33. **Which of the following is typically considered a component of Root of Trust?**
    - a. Trusted Platform Module (TPM)  ✅
    - b. Central Processing Unit (CPU)
    - c. Random Access Memory (RAM)
    - d. Graphic Processing Unit (GPU)
  
34. **What is a hadrware Trojan?**
    - a. A hardware Trojan is a malicious modification of the circuitry of an integrated circuit intended to cause harm or allow unauthorized access  ✅
    - b. A hardware Trojan is a type of computer virus that infects the software of a computer system
    - c. A hardware Trojan is a secure hardware module designed to protect computer systems from malware
    - d. A hardware Trojan is a software program used to test the reliability of computer hardware components

35. **What is a block cipher?**
    - a. A method of encrypting data in fixed-size blocks ✅
    - b. A method of encrypting data one bit at a time
    - c. A public-key encryption algorithm
    - d. A hashing algorithm

36. **What type of vulnerability does the following C code have?**

    ```c
    #include <stdio.h>
    void vulnerable_function(char *input) {
        printf(input);
    }
    int main() {
        char input[100];
        gets(input);
        vulnerable_function(input);
        return 0;
    }
    ```

    - a. Buffer Overflow
    - b. Use After Free
    - c. SQL Injection
    - d. Format String Vulnerability

37. **Select the correct option describing how the process of a digital signature works:**
    - a. Alice encrypts the message M with her private key so that ciphertext C = enc(M, Kpriv). Then Alice sends C to Bob. Bob decrypts C using Alice's public key. Suppose the message M is the one that Bob was expecting. In that case, it means the authenticity and integrity of the message are guaranteed.
    - b. None.
    - c. Alice computes the hash value h of the message M, h = H(M). Then Alice encrypts the hash value h with her private key (S = enc(h, Kpriv)) and sends M || S to Bob. Bob computes the hash value h’ of the message M using the algorithm Alice used (h’ = H(M)). Then Bob decrypts the signature S using Alice’s public key, obtaining h. If h == h’, then the signature is valid. ✅
    - d. Alice computes the hash value h of the message M, h = H(M). Then Alice encrypts the hash value h with Bob's public key (S = enc(h, Kpub)) and sends M || S to Bob. Bob decrypts S using his private key and compares it with the hash of M.

38. **Which of the following methods can detect hardware Trojans?**
    - a. Signature-based detection
    - b. Side-channel analysis ✅
    - c. Sandboxing
    - d. Patch management


39. **Select the appropriate statement(s) about Random Number Generators:**
    - a. PRNGs exhibit periodic patterns that, despite being long, reduce the randomness of the RNG itself. ✅
    - b. When available and not unusable (e.g., not too slow, not too computationally heavy, etc.), a TRNG is equivalent to a PRNG.
    - c. PRNGs are faster and more efficient than TRNGs. ✅
    - d. TRNGs require the user to provide an initial seed to start the algorithm.


40. **What is the primary security impact of a successful Row Hammer attack?**
    - a. It causes bit flips in memory, potentially leading to data corruption or unauthorized access. ✅
    - b. It allows for encryption of memory contents.
    - c. It increases the speed of data retrieval from memory.
    - d. It prevents unauthorized memory access.


41.  **Why are Silicon PUFs considered secure?**
    - a. They are based on the inherent physical characteristics of silicon, making them unique and difficult to replicate ✅
    - b. They are based on the physical characteristics of silicon, tunable to be unique and difficult to replicate
    - c. They are one-way functions based on cryptographic algorithms
    - d. They are hidden in the physical chip


42. **Which of the following explains the correct usage of Simple Power Analysis (SPA)?**
    - a. SPA is the analysis of electromagnetic radiation to enable MITM attacks.
    - b. SPA captures multiple power traces to deduce cryptographic secrets.
    - c. SPA involves injecting faults and analyzing power to uncover operations.
    - d. SPA captures a single power trace to analyze instruction flow and infer secrets. ✅


43. **Which of the following is a key feature of TPM architecture?**
    - a. Advanced
    - b. Large secure storage
    - c. High-speed data processing
    - d. Secure generation and storage of cryptographic keys ✅


44. **Which threat is TEE particularly designed to protect against?**
    - a. Malware and unauthorized access ✅
    - b. Signal interference
    - c. Physical theft of the device
    - d. Data confidentiality


45. **How does a TPM usually contribute to the security of a device?**
    - a. It verifies the authenticity of hardware/software configuration to enforce system trust. ✅
    - b. It monitors threats in real-time (processes, network, etc.).
    - c. It manages access control for encrypted resources and peripherals.
    - d. None of the above. TPM stands for “Trusted Password Management”.


46. **What is a primary characteristic of a Strong PUF?**
    - a. Simple design and implementation
    - b. Resistance to physical tampering
    - c. Low power consumption
    - d. Large number of challenge-response pairs ✅


47. **Which component is primarily targeted in a Row Hammer attack?**
    - a. Hard disk sectors
    - b. DRAM memory cells ✅
    - c. CPU cache
    - d. Network interface cards


48. **Which mode of operation for block ciphers ensures that identical plaintext blocks produce different ciphertext blocks?**
    - a. Electronic Codebook (ECB)
    - b. Cipher Block Chaining (CBC) ✅
    - c. Output Feedback (OFB)
    - d. Counter (CTR)


49. **What is a CSW?**
    - a. A feature that secures system performance
    - b. An intentional backdoor in the system
    - c. A flaw or vulnerability that can be exploited to compromise security ✅
    - d. An encrypted communication channel


50. **Select the appropriate statements about the differences between symmetric and asymmetric cryptography:**
    - a. One technique is inherently more secure, independent of algorithm, implementation, or key quality.
    - b. Asymmetric cryptography is harder to use due to key agreement.
    - c. Both types do not require intermediate actors like CAs.
    - d. For large plaintexts (e.g., 2 GB), use asymmetric for confidentiality and symmetric for other properties. ✅
    - e. Asymmetric cryptography needs fewer keys when many actors are involved. ✅
