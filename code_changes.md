# CONTACT PHONE RESTORATION PATCH

The phone is currently rendering far too small because the CSS sizing no longer matches the simplified HTML structure.

Apply the following replacements exactly.

---

## 1. ENLARGE THE ENTIRE PHONE

### FIND

```css
.phonebook-widget {
    position: relative;
    width: 100%;
    max-width: 600px;
    aspect-ratio: 420 / 220;
}
```

### REPLACE WITH

```css
.phonebook-widget {
    position: relative;
    width: 100%;
    max-width: 860px;
    aspect-ratio: 420 / 220;

    margin-top: 2rem;
    transform: translateY(-80px);
}
```

---

## 2. FIX CONTACT DIRECTORY POSITIONING

### FIND

```css
.contact-directory {
    position: absolute;
    left: 8.6%;
    top: 43.6%;
    width: 34.5%;
    height: 23.6%;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.15rem 0.25rem;
    box-sizing: border-box;
}
```

### REPLACE WITH

```css
.contact-directory {
    position: absolute;

    left: 9%;
    top: 44%;

    width: 30%;
    height: 18%;

    z-index: 5;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 0.25rem;
    box-sizing: border-box;
}
```

---

## 3. INCREASE DIRECTORY TEXT SIZE

### FIND

```css
.directory-value {
    font-family: var(--font-heading);
    font-size: 0.52rem;
    color: var(--text-muted);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.25s ease;
}
```

### REPLACE WITH

```css
.directory-value {
    font-family: var(--font-heading);
    font-size: 0.9rem;
    color: var(--text-muted);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.25s ease;
}
```

---

## 4. INCREASE SCREEN TITLE SIZE

### FIND

```css
.screen-title {
    font-size: 0.5rem;
    letter-spacing: 0.05em;
    color: #00f0ff;
    text-shadow: 0 0 4px rgba(0, 240, 255, 0.4);
}
```

### REPLACE WITH

```css
.screen-title {
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    color: #00f0ff;
    text-shadow: 0 0 4px rgba(0, 240, 255, 0.4);
}
```

---

## 5. INCREASE STATUS TEXT SIZE

### FIND

```css
.screen-status {
    font-family: var(--font-body);
    font-size: 0.46rem;
    color: var(--text-muted);
    font-weight: 500;
}
```

### REPLACE WITH

```css
.screen-status {
    font-family: var(--font-body);
    font-size: 0.65rem;
    color: var(--text-muted);
    font-weight: 500;
}
```

---

## EXPECTED RESULT

After applying this patch:

- Phone body becomes substantially larger.
- Handset becomes visible again.
- Keypad becomes readable.
- Directory text becomes readable.
- Contact section resembles the earlier working version.
- Phone occupies the visual weight shown in the reference screenshot.